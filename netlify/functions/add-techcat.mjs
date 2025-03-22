import { Octokit } from "@octokit/core";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";

function formatIssueContent(formData) {
  const content = `
    # New TechCat Submission

    ## Techcat Details
    - Name: ${formData.get("techcat-name")}
    - Bio: ${formData.get("techcat-about")}
    - Photo: ${formData.get("techcat-photo")}
    - In Memoriam: ${formData.get("techcat-memoriam")}

    ## Caretaker Details
    - Name: ${formData.get("caretaker-name")}
    - Website: ${formData.get("caretaker-website")}
    - Social: ${formData.get("caretaker-social")}
    - GitHub: ${formData.get("caretaker-github")}
  `;

  return content;
}

const handler = async (request) => {
  const formData = await request.formData();

  const owner = "schalkneethling";
  const repo = "techcats";
  const issueTitle = `New TechCat Submission: ${formData.get("techcat-name")}`;
  const issueBody = formatIssueContent(formData);
  const issueLabels = ["new techcat"];

  const OctoCat = Octokit.plugin(restEndpointMethods);
  const octokit = new OctoCat({
    auth: process.env.GITHUB_TOKEN,
  });

  let newIssue;
  let response;
  try {
    newIssue = await octokit.rest.issues.create({
      owner,
      repo,
      title: issueTitle,
      body: issueBody,
      labels: issueLabels,
    });

    if (newIssue.status === 201) {
      response = new Response(
        JSON.stringify({
          success: true,
          issue: newIssue.data.html_url,
        }),
        {
          headers: new Headers({
            "content-type": "application/json",
          }),
        },
      );
    }
  } catch (error) {
    throw new Error(`Error creating issue: ${error.message}`);
  }

  return response;
};

export default handler;
