import {
  Button,
  Group,
  Modal,
  Select,
  TextInput,
  Textarea,
  NumberInput,
  Stack,
  Text,
  Box,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, Controller } from 'react-hook-form';
import { IconCalendar, IconChevronDown } from '@tabler/icons-react';
import axios from 'axios';

const backendurl=process.env.NEXT_PUBLIC_API_URL;
interface JobFormValues {
  title: string;
  companyName: string;
  location: string;
  type: string;
  salaryMin: number;
  salaryMax: number;
  deadline: Date | null;
  description: string;
  Minexp:number;
  Maxexp:number
}

interface CreateJobModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function CreateJobModal({ opened, onClose }: CreateJobModalProps) {
  const {
    handleSubmit,
    control,
    reset,
  } = useForm<JobFormValues>({
    defaultValues: {
      title: '',
      companyName: '',
      location: '',
      type: 'FullTime',
      salaryMin: 0,
      salaryMax: 1200000,
      deadline: null,
      description: '',
      Minexp: 0,
      Maxexp: 0,
    },
  });

  const onSubmit = async (data: JobFormValues) => {
     const payload = {
    ...data,
    salaryMin: Number(data.salaryMin),
    salaryMax: Number(data.salaryMax),
  };
    console.log(`${backendurl}/jobs`,payload);
   const response= await axios.post(`${backendurl}/jobs`,payload)
   
   
   console.log(response)
    reset();
    onClose();
  };

  const onSaveDraft = (data: JobFormValues) => {
    console.log('Saved Draft:', data);
    onClose();
  };

  const inputStyles = {
    input: {
      borderRadius: '12px',
      border: '1.5px solid #e9ecef',
      fontSize: '16px',
      padding: '16px',
      height: '56px',
      '&:focus': {
        borderColor: '#339af0',
      },
    },
    label: {
      fontSize: '16px',
      fontWeight: 500,
      color: '#495057',
      marginBottom: '8px',
    },
  };

  const selectStyles = {
    input: {
      borderRadius: '12px',
      border: '1.5px solid #e9ecef',
      fontSize: '16px',
      padding: '16px',
      height: '56px',
      '&:focus': {
        borderColor: '#339af0',
      },
    },
    label: {
      fontSize: '16px',
      fontWeight: 500,
      color: '#495057',
      marginBottom: '8px',
    },
    dropdown: {
      borderRadius: '12px',
      border: '1.5px solid #e9ecef',
    },
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="xl"
      centered
      radius="xl"
      padding="xl"
      styles={{
        content: {
          borderRadius: '24px',
        },
        header: {
          paddingBottom: '24px',
        },
        title: {
          fontSize: '28px',
          fontWeight: 600,
          color: '#212529',
          textAlign: 'center',
          width: '100%',
        },
      }}
      title="Create Job Opening"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="xl">
          <Group grow align="flex-start">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextInput 
                  label="Job Title" 
                  placeholder="Full Stack Developer" 
                  styles={inputStyles}
                  {...field} 
                />
              )}
            />

            <Controller
              name="companyName"
              control={control}
              render={({ field }) => (
                <TextInput 
                  label="Company Name" 
                  placeholder="Amazon" 
                  styles={inputStyles}
                  {...field} 
                />
              )}
            />
            <Controller
              name="Minexp"
              control={control}
              render={({ field }) => (
                <NumberInput 
                  label="Minexp" 
                   
                  styles={inputStyles}
                  {...field} 
                />
              )}
            />
            <Controller
              name="Maxexp"
              control={control}
              render={({ field }) => (
                <NumberInput 
                  label="Maxexp" 
                   
                  styles={inputStyles}
                  {...field} 
                />
              )}
            />
          </Group>

          <Group grow align="flex-start">
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Select
                  label="Location"
                  placeholder="Chennai"
                  data={['Chennai', 'Bangalore', 'Hyderabad']}
                  styles={selectStyles}
                  rightSection={<IconChevronDown size={20} color="#868e96" />}
                  {...field}
                />
              )}
            />

            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  label="Job Type"
                  placeholder="FullTime"
                  data={[
                    { value: 'FullTime', label: 'FullTime' },
                    { value: 'PartTime', label: 'PartTime' },
                    { value: 'Internship', label: 'Internship' }
                  ]}
                  styles={selectStyles}
                  rightSection={<IconChevronDown size={20} color="#868e96" />}
                  {...field}
                />
              )}
            />
          </Group>

          <Box>
            <Text size="md" fw={500} c="#495057" mb="xs">Salary Range</Text>
            <Group grow align="flex-start">
              <Controller
                name="salaryMin"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    placeholder="₹0"
                    min={0}
                    prefix="₹ "
                    styles={{
                      input: {
                        borderRadius: '12px',
                        border: '1.5px solid #e9ecef',
                        fontSize: '16px',
                        padding: '16px',
                        height: '56px',
                        color: '#adb5bd',
                        '&:focus': {
                          borderColor: '#339af0',
                        },
                      },
                    }}
                    {...field}
                  />
                )}
              />

              <Controller
                name="salaryMax"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    placeholder="₹12,00,000"
                    min={0}
                    prefix="₹ "
                    styles={{
                      input: {
                        borderRadius: '12px',
                        border: '1.5px solid #e9ecef',
                        fontSize: '16px',
                        padding: '16px',
                        height: '56px',
                        color: '#adb5bd',
                        '&:focus': {
                          borderColor: '#339af0',
                        },
                      },
                    }}
                    {...field}
                  />
                )}
              />
            </Group>
          </Box>

          <Controller
            name="deadline"
            control={control}
            render={({ field }) => (
              <DateInput
                label="Application Deadline"
                placeholder="Pick date"
                rightSection={<IconCalendar size={20} color="#adb5bd" />}
                styles={{
                  input: {
                    borderRadius: '12px',
                    border: '1.5px solid #e9ecef',
                    fontSize: '16px',
                    padding: '16px',
                    height: '56px',
                    '&:focus': {
                      borderColor: '#339af0',
                    },
                  },
                  label: {
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#495057',
                    marginBottom: '8px',
                  },
                }}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                label="Job Description"
                placeholder="Please share a description to let the candidate know more about the job role"
                minRows={6}
                styles={{
                  input: {
                    borderRadius: '12px',
                    border: '1.5px solid #e9ecef',
                    fontSize: '16px',
                    padding: '16px',
                    '&:focus': {
                      borderColor: '#339af0',
                    },
                  },
                  label: {
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#495057',
                    marginBottom: '8px',
                  },
                }}
                {...field}
              />
            )}
          />

          <Group justify="space-between" mt="xl">
            <Button
              variant="outline"
              size="lg"
              radius="xl"
              onClick={handleSubmit(onSaveDraft)}
              rightSection={<IconChevronDown size={16} />}
              styles={{
                root: {
                  borderColor: '#dee2e6',
                  color: '#495057',
                  fontWeight: 500,
                  fontSize: '16px',
                  height: '56px',
                  paddingLeft: '32px',
                  paddingRight: '32px',
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                  },
                },
              }}
            >
              Save Draft
            </Button>

            <Button 
              type="submit"
              size="lg"
              radius="xl"
              rightSection="➤"
              styles={{
                root: {
                  background: 'linear-gradient(135deg, #339af0 0%, #228be6 100%)',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '16px',
                  height: '56px',
                  paddingLeft: '40px',
                  paddingRight: '40px',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #228be6 0%, #1971c2 100%)',
                  },
                },
              }}
            >
              Publish
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}