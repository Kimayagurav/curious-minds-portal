export async function registerStudent(data: {
  name: string;
  gmail: string;
  phone: string;
  std: string;
  batch: string;
  stream: string;
}) {
  const formURL =
    "https://docs.google.com/forms/d/e/1FAIpQLSfsJ9dnY48XLbNqZg0pMfgv2niNashGc3LvHxpwYJVJP2V1LA/formResponse";

  const formData = new FormData();

  formData.append("entry.1893266227", data.name);
  formData.append("entry.14378244", data.gmail);
  formData.append("entry.569010505", data.phone);
  formData.append("entry.455105084", data.std);
  formData.append("entry.211419530", data.batch);
  formData.append("entry.982056547", data.stream);

  await fetch(formURL, {
    method: "POST",
    mode: "no-cors",
    body: formData,
  });
}