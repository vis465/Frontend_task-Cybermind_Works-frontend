export async function fetchJobs() {
  const res = await fetch('/mock/jobs.json');
  return res.json();
}
