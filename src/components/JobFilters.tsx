import {
  Group,
  TextInput,
  Select,
  RangeSlider,
  Text,
  Divider,
} from '@mantine/core';
import { IconSearch, IconMapPin, IconUsers } from '@tabler/icons-react';
import { useState } from 'react';

export default function JobFilters() {
  const [salaryRange, setSalaryRange] = useState<[number, number]>([50000, 80000]);

  return (
    <Group gap="sm" align="flex-end" px="md" py="sm" style={{ borderRadius: 12, backgroundColor: '#fff' }}>
      {/* Search Input */}
      <TextInput
        placeholder="Search By Job Title, Role"
        leftSection={<IconSearch size={16} />}
        w={250}
        radius="md"
        size="md"
      />

      <Divider orientation="vertical" />

      {/* Preferred Location Select */}
      <Select
        placeholder="Preferred Location"
        leftSection={<IconMapPin size={16} />}
        data={['Chennai', 'Bangalore', 'Hyderabad']}
        w={200}
        radius="md"
        size="md"
        rightSectionWidth={30}
      />

      <Divider orientation="vertical" />

      {/* Job Type Select */}
      <Select
        placeholder="Job type"
        leftSection={<IconUsers size={16} />}
        data={['FullTime', 'PartTime', 'Internship']}
        w={180}
        radius="md"
        size="md"
        rightSectionWidth={30}
      />

      <Divider orientation="vertical" />

      {/* Salary Slider */}
      <div style={{ width: 300 }}>
        <Text size="sm" mb={4}>Salary Per Month</Text>
        <RangeSlider
          min={10000}
          max={200000}
          step={5000}
          
          value={salaryRange}
          onChange={setSalaryRange}
          marks={[
            { value: 50000, label: '₹50k' },
            { value: 80000, label: '₹80k' },
          ]}
        />
      </div>
    </Group>
  );
}
