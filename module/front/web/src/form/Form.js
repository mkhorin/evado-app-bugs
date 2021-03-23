/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Front.Form = class Form extends Front.Element {

    init () {
        this.$topError = this.find('.form-error');
        this.on('form:clear', this.onClear.bind(this));
    }

    onClear () {
        this.find('[name]').val('');
    }

    hasAttr (name) {
        return this.getValueElement(name).length > 0;
    }

    getAttr (name) {
        return this.getAttrByElement(this.getValueElement(name));
    }

    getAttrByElement (element) {
        return this.find(element).closest('.form-attr');
    }

    getValue (name) {
        return this.getValueElement(name).val();
    }

    setValue (name, value) {
        return this.getValueElement(name).val(value);
    }

    getValueElement (name) {
        return this.find(`[name="${name}"]`);
    }

    hasError () {
        return this.find('.has-error').length > 0;
    }

    addTopError (message) {
        this.$topError.html(message).addClass('has-error');
    }

    addErrors (data) {
        if (!data) {
            return false;
        }
        const topErrors = [];
        for (const name of Object.keys(data)) {
            this.getAttr(name).length
                ? this.addError(name, data[name])
                : topErrors.push(data[name]);
        }
        if (topErrors.length) {
            this.addTopError(topErrors.join('<br>'));
        }
    }

    addError (name, message) {
        const $attr = this.getAttr(name);
        $attr.addClass('has-error').find('.error-block').html(message);
        $attr.parents('.form-set').addClass('has-group-error');
    }

    clearErrors () {
        this.find('.has-error').removeClass('has-error');
        this.find('.has-group-error').removeClass('has-group-error');
    }

    setErrors (data) {
        data = Jam.Helper.parseJson(data);
        if (data) {
            for (const key of Object.keys(data)) {
                this.addError(key, data[key]);
            }
        }
    }

    serialize () {
        const result = {};
        for (const item of this.find('[name]')) {
            result[item.name] = $(item).val();
        }
        return result;
    }

    focus (name) {
        this.getValueElement(name).focus();
    }

    validate () {
        this.clearErrors();
        for (const item of this.find('[name]')) {
            const $attr = this.getAttrByElement(item);
            const value = $(item).val();
            if ($attr.hasClass('required') && !value) {
                this.addError(item.name, 'Value cannot be blank');
            }
        }
        return !this.find('.has-error').length;
    }
};