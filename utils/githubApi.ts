// utils/githubApi.ts

async function getGithubProfileImage(username: string): Promise<string | null> {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch GitHub profile');
      }
      const data = await response.json();
      return data.avatar_url;
    } catch (error) {
      console.error('Error fetching GitHub profile:', error);
      return null;
    }
  }
  
  export { getGithubProfileImage };
  