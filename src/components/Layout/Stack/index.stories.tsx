import { Meta, StoryObj } from "@storybook/react";
import { Stack } from ".";
import { Box } from "@/components/Layout/Box";

const meta: Meta<typeof Text> = {
  title: "Layout/Stack",
  component: Stack,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Stack className="gap-4 p-4 bg-gray-400" {...args}>
      <Box className="w-[100px] h-[100px] bg-blue-500" />
      <Box className="w-[100px] h-[100px] bg-red-500" />
      <Box className="w-[100px] h-[100px] bg-green-500" />
    </Stack>
  ),
};
