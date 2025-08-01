import {
  Card,
  Text,
  Button,
  Group,
  Image,
  Badge,
  Stack,
  
} from '@mantine/core';
import { rem } from '@mantine/core';

import {
  IconBuilding,
  IconCalendarTime,
  IconBriefcase,
  IconUser,
  IconLayersOff,
} from '@tabler/icons-react';
import { Calendar } from 'tabler-icons-react';

interface Job {
  id: number;
  company: string;
  title: string;
  experience: string;
  type: string;
  salary: string;
  logo: string;
  salaryMin:string;
  salaryMax:string;
  description:string;
  deadline:string;
  Maxexp:number,
  Minexp:number,
  location:string
}

export default function JobCard({ job }: { job: Job }) {
   const deadlineDate = new Date(job.deadline);
  const formattedDeadline = deadlineDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return (
    <Card
      radius="xl"
      shadow="md"
      padding="xl"
      withBorder
      style={{
        border: '1px solid #e5e7eb',
        boxShadow: '0px 4px 16px rgba(0,0,0,0.06)',
      }}
    >
      {/* Logo & Badge */}
      <Group justify="space-between" mb="sm">
        <Image src={job.logo} alt={job.company} w={50} radius="md" />
        <Badge
          color="blue"
          radius="md"
          size="md"
          variant="light"
          style={{ fontWeight: 500 }}
        >
          24h Ago
        </Badge>
      </Group>

      {/* Job Title */}
      <Text size="lg" fw={600} mb={8}>
        {job.title}
      </Text>

      {/* Meta Info */}
      <Group gap="xs" mb="xs">
        <Group gap={4}>
          <IconUser size={16} />
          <Text size="sm">{job.Minexp} - {job.Maxexp}</Text>
        </Group>
        <Group gap={4}>
          <IconBuilding size={16} />
          <Text size="sm">{job.type}</Text>
        </Group>
        <Group gap={4}>
          <IconBuilding size={16} />
          <Text size="sm">{job.location}</Text>
        </Group>
        <Group gap={4}>
          <IconLayersOff size={16} />
          <Text size="sm"> Rs. {job.salaryMin} - {job.salaryMax}</Text>
        </Group>
           <Group gap={4}>
      <Calendar size={16} />
      <Text size="sm">{formattedDeadline}</Text>
    </Group>
      </Group>

      {/* Description */}
      <Stack gap={2} mt="xs" mb="md">
        <Text size="sm" c="dimmed">
         {job.description}
        </Text>
      </Stack>

      {/* Button */}
      <Button fullWidth radius="xl" size="md" color="blue">
        Apply Now
      </Button>
    </Card>
  );
}
