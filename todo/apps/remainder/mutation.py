from graphene_django.forms.mutation import *

from django.forms.models import modelform_factory
from .connection import CustomDjangoFilterConnectionField


class CustomDjangoCreateModelFormMutation(BaseDjangoFormMutation):
    inject_id = False
    return_edge = True
    return_field_name = 'edge'

    class Meta:
        abstract = True

    errors = graphene.List(ErrorType)

    @classmethod
    def __init_subclass_with_meta__(
            cls,
            form_class=None,
            model=None,
            return_field_name=None,
            only_fields=(),
            exclude_fields=(),
            fields=None, exclude=None,
            formfield_callback=None, widgets=None, localized_fields=None,
            labels=None, help_texts=None, error_messages=None,
            field_classes=None,
            **options
    ):
        if not form_class:
            if model:
                form_class = modelform_factory(
                    model, fields=fields, exclude=exclude,
                    formfield_callback=formfield_callback, widgets=widgets, localized_fields=localized_fields,
                    labels=labels, help_texts=help_texts, error_messages=error_messages,
                    field_classes=field_classes)
            else:
                raise Exception("form_class is required for DjangoModelFormMutation %s, %s", form_class, model)

        if not model:
            model = form_class._meta.model

        if not model:
            raise Exception("model is required for DjangoModelFormMutation")

        form = form_class()
        input_fields = fields_for_form(form, only_fields, exclude_fields)
        if cls.inject_id:
            input_fields["id"] = graphene.ID(required=True)

        registry = get_global_registry()
        model_type = registry.get_type_for_model(model)
        if not model_type:
            raise Exception("No type registered for model: {}".format(model.__name__))

        if not return_field_name:
            return_field_name = cls.return_field_name

        output_fields = OrderedDict()
        if cls.return_edge:
            output_fields[return_field_name] = graphene.Field(CustomDjangoFilterConnectionField(model_type).type.Edge)
        else:
            output_fields[return_field_name] = graphene.Field(model_type)

        _meta = DjangoModelDjangoFormMutationOptions(cls)
        _meta.form_class = form_class
        _meta.model = model
        _meta.return_field_name = return_field_name
        _meta.fields = yank_fields_from_attrs(output_fields, _as=Field)

        input_fields = yank_fields_from_attrs(input_fields, _as=InputField)
        super(CustomDjangoCreateModelFormMutation, cls).__init_subclass_with_meta__(
            _meta=_meta, input_fields=input_fields, **options
        )

    @classmethod
    def perform_mutate(cls, form, info):
        registry = get_global_registry()
        model_type = registry.get_type_for_model(cls._meta.model)
        obj = form.save()
        kwargs = {cls._meta.return_field_name: CustomDjangoFilterConnectionField(model_type).type.Edge(node=obj)}
        return cls(errors=[], **kwargs)


class CustomDjangoUpdateModelFormMutation(CustomDjangoCreateModelFormMutation):
    inject_id = True
    return_edge = False
    return_field_name = 'node'

    class Meta:
        abstract = True

    @classmethod
    def perform_mutate(cls, form, info):
        obj = form.save()
        kwargs = {cls._meta.return_field_name: obj}
        return cls(errors=[], **kwargs)


class CustomDjangoDeleteModelFormMutation(ClientIDMutation):
    class Meta:
        abstract = True

    @classmethod
    def __init_subclass_with_meta__(
            cls,
            model=None,
            **options
    ):
        input_fields = OrderedDict()
        input_fields["id"] = graphene.Field(graphene.ID, required=True)

        output_fields = OrderedDict()
        output_fields['deleted_id'] = graphene.Field(graphene.ID)
        _meta = MutationOptions(cls)
        _meta.model = model
        # _meta.fields = output_fields
        _meta.fields = yank_fields_from_attrs(output_fields, _as=Field)
        # print(cls, model, options, output_fields, input_fields)
        print(input_fields)
        super(CustomDjangoDeleteModelFormMutation, cls).__init_subclass_with_meta__(
            _meta=_meta, input_fields=input_fields, **options
        )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        _id = input['id']
        obj = cls._meta.model.objects.get(pk=from_global_id(_id)[1])
        obj.delete()
        return cls(deleted_id=_id)
