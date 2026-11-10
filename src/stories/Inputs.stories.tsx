import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { CheckboxField } from '../components/CheckboxField/CheckboxField';
import { InputField } from '../components/InputField/InputField';
import {
  DateInputField,
  DatePickerField,
  RadioField,
  SearchField,
  SelectField,
  SliderField,
  SwitchField,
  TextareaField,
} from '../components/Inputs';

const selectOptions = [
  { label: 'Option 1', value: 'one' },
  { label: 'Option 2', value: 'two' },
  { label: 'Option 3', value: 'three' },
];

const meta = {
  title: 'Components/Inputs',
  component: InputField,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    type: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    helperText: { control: 'text' },
  },
  args: {
    label: 'Label',
    placeholder: 'Value',
    type: 'text',
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputFieldDefault: Story = {};

export const InputFieldStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(180px, 1fr))', gap: 24, maxWidth: 900 }}>
      <InputField label="Default" placeholder="Value" />
      <InputField label="Disabled" placeholder="Value" disabled />
      <InputField label="Error" defaultValue="Value" error="Please check this value." />
      <InputField label="Placeholder" placeholder="Enter a value" />
      <InputField label="Helper text" placeholder="Value" helperText="A short description for this field." />
      <InputField label="Password" type="password" placeholder="Value" />
    </div>
  ),
};

export const DateFields: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(220px, 1fr))', gap: 24, maxWidth: 900 }}>
      <DateInputField label="Date input" name="date-input" />
      <DateInputField label="Disabled" disabled />
      <DateInputField label="Error" error="Enter a valid date." />
      <DatePickerField label="Date picker" />
      <DatePickerField label="Disabled" disabled />
      <DatePickerField label="Error" error="Choose a valid date." />
    </div>
  ),
};

export const SelectFields: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(180px, 1fr))', gap: 24, maxWidth: 900 }}>
      <SelectField label="Default" options={selectOptions} />
      <SelectField label="Disabled" options={selectOptions} disabled />
      <SelectField label="Error" options={selectOptions} error="Please select an option." />
      <SelectField label="Placeholder" options={selectOptions} placeholder="Choose a value" />
      <SelectField label="Selected" options={selectOptions} defaultValue="two" />
      <SelectField label="Helper text" options={selectOptions} helperText="Choose one item." />
    </div>
  ),
};

export const CheckboxAndRadioFields: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(220px, 1fr))', gap: 32, maxWidth: 700 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <strong>Checkbox field group</strong>
        <CheckboxField label="Checked" description="Description" defaultChecked />
        <CheckboxField label="Unchecked" description="Description" />
        <CheckboxField label="Disabled" description="Description" disabled />
        <CheckboxField label="Error" error="This option is required." />
      </div>
      <div>
        <RadioField
          label="Radio field group"
          name="radio-example"
          defaultValue="first"
          onChange={fn()}
          options={[
            { label: 'Selected', description: 'Description', value: 'first' },
            { label: 'Unselected', description: 'Description', value: 'second' },
            { label: 'Disabled', description: 'Description', value: 'third', disabled: true },
          ]}
        />
      </div>
    </div>
  ),
};

export const SearchSliderSwitchAndTextarea: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(220px, 1fr))', gap: 24, maxWidth: 700 }}>
      <SearchField label="Search" placeholder="Value" />
      <SearchField label="Search filled" defaultValue="Value" />
      <SearchField label="Search disabled" placeholder="Value" disabled />
      <SliderField label="Slider field" min={0} max={100} defaultValue={50} description="Description" />
      <SliderField label="Slider disabled" min={0} max={100} defaultValue={50} disabled />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SwitchField label="Switch field" defaultChecked />
        <SwitchField label="Switch unchecked" />
        <SwitchField label="Switch disabled" disabled />
      </div>
      <TextareaField label="Textarea field" placeholder="Value" rows={3} />
      <TextareaField label="Textarea disabled" placeholder="Value" disabled rows={3} />
      <TextareaField label="Textarea error" defaultValue="Value" error="Please check this value." rows={3} />
    </div>
  ),
};
