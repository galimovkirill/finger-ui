import type { Meta, StoryObj } from '@storybook/vue3';

import BaseInput from '@/components/Base/Input/BaseInput.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import IconEyeCrossed from '@/icons/IconEyeCrossed.vue';
import IconEye from '@/icons/IconEye.vue';
import IconUser from '@/icons/IconUser.vue';
import { ref } from 'vue';

const meta: Meta<typeof BaseInput> = {
    component: BaseInput,
    title: 'Input',
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof BaseInput>;

export const Default: Story = {
    render: (args) => ({
        components: { BaseInput },

        setup() {
            const value = ref('')

            return { args, value };
        },

        template: `
            <div class="sb-flex sb-items-center sb-justify-center sb-gap-2">
                <BaseInput v-model="value" placeholder="Enter your name" />
            </div>
        `
    })
}

export const Icon: Story = {
    render: (args) => ({
        components: { BaseInput, SvgIcon, IconUser },

        setup() {
            const value = ref('')

            return { args, value };
        },

        template: `
            <div class="sb-flex sb-items-center sb-justify-center sb-gap-2">
                <BaseInput v-model="value" placeholder="Enter your name">
                    <template #icon>
                        <SvgIcon>
                            <IconUser />
                        </SvgIcon>
                    </template>
                </BaseInput>
            </div>
        `
    })
}

export const Password: Story = {
    render: (args) => ({
        components: { BaseInput, SvgIcon, IconEye, IconEyeCrossed },

        setup() {
            const password = ref('');
            const isPasswordVisible = ref(false)

            return { args, password, isPasswordVisible };
        },

        template: `
            <div class="sb-flex sb-items-center sb-justify-center sb-gap-2">
                <BaseInput
                    v-model="password"
                    placeholder="Enter your password"
                    icon-position="end"
                    type="password"
                    clickable-icon
                    :visible-password="isPasswordVisible"
                    @iconClick="isPasswordVisible = !isPasswordVisible"
                >
                    <template #icon>
                        <SvgIcon>
                            <IconEyeCrossed v-if="isPasswordVisible" />
                            <IconEye v-else />
                        </SvgIcon>
                    </template>
                </BaseInput>
            </div>
        `
    })
}