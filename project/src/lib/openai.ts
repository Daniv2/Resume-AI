import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateDocument(type: 'resume' | 'cover_letter', data: {
  jobTitle: string;
  company: string;
  jobDescription: string;
  experience: string;
  skills: string;
}) {
  const prompt = type === 'resume' 
    ? `Create a professional resume for a ${data.jobTitle} position at ${data.company}. 
       Job Description: ${data.jobDescription}
       Candidate Experience: ${data.experience}
       Skills: ${data.skills}
       Format the resume in a clear, professional structure.`
    : `Write a compelling cover letter for a ${data.jobTitle} position at ${data.company}.
       Job Description: ${data.jobDescription}
       Candidate Experience: ${data.experience}
       Skills: ${data.skills}
       Make it professional and engaging.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: type === 'resume' 
          ? "You are a professional resume writer. Create clear, concise, and impactful resumes."
          : "You are a professional cover letter writer. Create compelling and personalized cover letters."
      },
      {
        role: "user",
        content: prompt
      }
    ]
  });

  return completion.choices[0].message.content;
}