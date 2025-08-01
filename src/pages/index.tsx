import {
  Box,
  Button,
  Burger,
  Container,
  Divider,
  Drawer,
  Grid,
  Group,
  ScrollArea,
  
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from 'next/image';
import CreateJobModal from "@/components/applycard";
import JobFilters from "@/components/JobFilters";
import JobCard from "@/components/JobCard";
import JobPortalLogo from "../../public/logo.png";

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

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Find Jobs", href: "/jobs" },
  { label: "Find Talents", href: "/jobs" },
  { label: "Find Jobs", href: "/jobs" },
  { label: "About Us", href: "/about" },
  { label: "Testimonials", href: "/about" },
];

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [
    drawerOpened,
    { close: closeDrawer, toggle: toggleDrawer },
  ] = useDisclosure(false);
 const [filters, setFilters] = useState({
  location: '',
  type: '',
  salaryRange: [0, 1200000],
  keyword: '',
});

const staticjobdata=[
    {
        "id": 1,
        "companyName": "ama",
        "title": "fsd",
        "deadline": "2025-08-07T18:30:00.000Z",
        "description": "sasa",
        "location": "Bangalore",
        "type": "FullTime",
        "Minexp": "1",
        "Maxexp": "3",
        "salaryMin": 333,
        "salaryMax": 1200000
    },
    {
        "id": 2,
        "companyName": "amazon",
        "title": "fikter1",
        "deadline": "2025-08-08T18:30:00.000Z",
        "description": "theroahu",
        "location": "Hyderabad",
        "type": "FullTime",
        "Minexp": "1",
        "Maxexp": "3",
        "salaryMin": 10,
        "salaryMax": 100
    }
]
  const backend = process.env.NEXT_PUBLIC_API_URL;;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${backend}/jobs`);
        setJobs(response.data || staticjobdata);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [backend]);
 const filteredJobs = jobs.filter((job) => {
  const matchesKeyword = filters.keyword === '' || job.title.toLowerCase().includes(filters.keyword.toLowerCase());
  const matchesLocation = filters.location === '' || job.location === filters.location;
  const matchesType = filters.type === '' || job.type === filters.type;

  const jobSalaryMin = Number(job.salaryMin);
  const jobSalaryMax = Number(job.salaryMax);
  const matchesSalary = jobSalaryMin >= filters.salaryRange[0] && jobSalaryMax <= filters.salaryRange[1];

  return matchesKeyword && matchesLocation && matchesType && matchesSalary;
});

  return (
    <Box
      style={{
        fontFamily: "Satoshi, sans-serif",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      {/* Sticky Header */}
      <Box
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #e9ecef",
          borderRadius: "0 0 12px 12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          position: "sticky",
          top: 0,
          zIndex: 999,
        }}
      >
        <Container size="xl" py="sm">
          <Group justify="space-between" h="100%">
<Image src={JobPortalLogo} alt="Logo" width={100} height={40} />

            <Group h="100%" gap={32} visibleFrom="sm">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: "#495057",
                    fontWeight: 500,
                    fontSize: "16px",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Group>

            <Group visibleFrom="sm">
              <Button
                onClick={openModal}
                size="md"
                radius="xl"
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  fontWeight: 600,
                  paddingLeft: "24px",
                  paddingRight: "24px",
                }}
              >
                Create Job
              </Button>
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />
          </Group>
        </Container>
      </Box>

      {/* Drawer for mobile nav */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          <Divider my="sm" />

          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ display: "block", padding: "12px 16px", fontSize: 16 }}
              onClick={closeDrawer}
            >
              {link.label}
            </Link>
          ))}

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button
              onClick={() => {
                openModal();
                closeDrawer();
              }}
              size="md"
              radius="xl"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                fontWeight: 600,
                paddingLeft: "24px",
                paddingRight: "24px",
              }}
            >
              Create Job
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>

      {/* Modal */}
      <CreateJobModal opened={modalOpened} onClose={closeModal} />

      {/* Filters */}
      <Container size="xl" py="md">
<JobFilters filters={filters} setFilters={setFilters} />
      </Container>

      {/* Jobs Grid */}
      <Container size="xl" py="md">
        <Grid gutter="xl">
          {filteredJobs.map((
            job) => (
  <Grid.Col span={3} key={job.id}>
    <JobCard job={job} />
  </Grid.Col>
))}

        </Grid>
      </Container>
    </Box>
  );
}
