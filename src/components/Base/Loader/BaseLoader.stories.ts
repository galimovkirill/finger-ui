import type { Meta, StoryObj } from '@storybook/vue3';

import BaseLoader from '@/components/Base/Loader/BaseLoader.vue';

const meta: Meta<typeof BaseLoader> = {
    component: BaseLoader,
    title: 'Loader',
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof BaseLoader>;

export const Default: Story = {
    render: (args) => ({
        components: { BaseLoader },

        setup() {
            return { args };
        },

        template: `
            <div class="sb-flex sb-items-center sb-justify-center sb-gap-2">
                <BaseLoader />
            </div>
        `
    })
}

export const Size: Story = {
    render: (args) => ({
        components: { BaseLoader },

        setup() {
            return { args };
        },

        template: `
            <div class="sb-flex sb-items-center sb-justify-center sb-gap-2">
                <BaseLoader size="40px" width="6px" />
            </div>
        `
    })
}