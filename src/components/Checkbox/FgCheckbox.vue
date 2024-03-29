<template>
    <div
        class="fg-checkbox"
        :class="[{ 'fg-checkbox--label-before': labelBefore }]"
        :style="{ '--color-mode': `var(--fg-${color})` }"
    >
        <input
            :id="id.toString()"
            type="checkbox"
            class="fg-checkbox__hidden-element"
            :checked="isChecked"
            @change="onChange(($event.target as HTMLInputElement).checked)"
        />

        <label :for="id.toString()" class="fg-checkbox__label">
            <span class="fg-checkbox__element">
                <svg
                    class="fg-checkbox__checkmark"
                    viewBox="0 0 12 9"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M3.99999 6.6L9.89999 0.700003C10.0833 0.516669 10.3167 0.425003 10.6 0.425003C10.8833 0.425003 11.1167 0.516669 11.3 0.700003C11.4833 0.883336 11.575 1.11667 11.575 1.4C11.575 1.68334 11.4833 1.91667 11.3 2.1L4.69999 8.7C4.49999 8.9 4.26665 9 3.99999 9C3.73332 9 3.49999 8.9 3.29999 8.7L0.699987 6.1C0.516654 5.91667 0.424988 5.68334 0.424988 5.4C0.424988 5.11667 0.516654 4.88334 0.699987 4.7C0.883321 4.51667 1.11665 4.425 1.39999 4.425C1.68332 4.425 1.91665 4.51667 2.09999 4.7L3.99999 6.6Z"
                    />
                </svg>
            </span>

            <span v-if="$slots.default" class="fg-checkbox__text">
                <slot></slot>
            </span>
        </label>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { FgCheckboxProps } from './FgCheckbox';
import { some, isObject } from 'lodash';

const props = withDefaults(defineProps<FgCheckboxProps>(), {
    color: 'primary'
});

const emit = defineEmits<{
    'update:modelValue': [value: typeof props.modelValue];
}>();

const isChecked = computed(() => {
    if (Array.isArray(props.modelValue)) {
        if (isObject(props.value)) {
            return some(props.modelValue, props.value || '');
        }

        return props.modelValue.includes(props.value);
    }

    return props.modelValue;
});

const onChange = (value: boolean) => {
    if (!Array.isArray(props.modelValue)) {
        emit('update:modelValue', value);
        return;
    }

    const result = [...props.modelValue];

    if (
        (isObject(props.value) && some(props.modelValue, props.value || '')) ||
        props.modelValue.includes(props.value)
    ) {
        const index = props.modelValue.findIndex(
            (i) => JSON.stringify(i) === JSON.stringify(props.value)
        );

        result.splice(index, 1);
        emit('update:modelValue', result);
        return;
    }

    result.push(props.value);
    emit('update:modelValue', result);
};
</script>

<style lang="scss">
@import '@/assets/styles/typography.scss';
@import '@/assets/styles/mixin.scss';

.fg-checkbox {
    $self: &;

    &__hidden-element {
        display: none;

        &:checked + label {
            #{$self}__element {
                border-color: rgb(var(--color-mode));

                &:after {
                    transform: translate(-50%, -50%) scale(1);
                }
            }

            #{$self}__checkmark {
                opacity: 1;
            }
        }
    }

    &__label {
        display: flex;
        align-items: center;
        cursor: pointer;
        gap: 8px;
    }

    &__checkmark {
        position: relative;
        z-index: 2;
        opacity: 0;
        fill: getColor('base-01');
        transition: 0.2s ease-in;
        transition-delay: 0.2s;
        width: 12px;
        height: 12px;
    }

    &__element {
        $borderRadius: 8px;

        border: 2px solid getColor('base-05');
        border-radius: $borderRadius;
        width: 24px;
        height: 24px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        position: relative;
        transition: 0.3s;
        flex-shrink: 0;

        &::after {
            content: '';
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            width: calc(100% + 2px);
            height: calc(100% + 2px);
            background-color: rgb(var(--color-mode));
            border-radius: $borderRadius;
            transition: 0.3s;
            box-shadow: 0 5px 18px 0 rgba(var(--color-mode), 0.3);
        }
    }

    &__text {
        @extend .text-body-s;
    }

    &--label-before {
        #{$self}__label {
            flex-direction: row-reverse;
        }
    }
}
</style>
