import { supabase } from "./supabaseClient";

export async function getPosts() {
  let { data: posts, error } = await supabase.from("posts").select();

  if (error) {
    console.error(error);
    return [];
  } else {
    return posts || [];
  }
}

export async function getPostById(id) {
  let { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error("error");
    return null; // if there's an error, return null
  } else {
    return posts[0] || null; // return the first post or null if posts is empty
  }
}

export async function createPost(title, content, date) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .insert([{ title, content, date }]);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}

/*
export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    console.log(matterResult.data); // Ajouter cette ligne pour afficher les données

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
*/
