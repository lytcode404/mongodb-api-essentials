// pages/api/posts.js

import ConnectToDatabase from './ConnectionDB';
import Schema from './schema';

export default async function handler(req, res) {
  const { method, body } = req;

  await ConnectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const posts = await Schema.find({});
        res.status(200).json(posts);
      } catch (error) {
        res.status(500).json({ error: 'Unable to fetch posts' });
      }
      break;

    case 'POST':
      try {
        const { title, body, author } = req.body;
        const post = new Schema({ title, body, author });
        const savedPost = await post.save();
        res.status(200).json(savedPost);
      } catch (error) {
        res.status(500).json(error);
        console.error(error);
      }
      break;

    case 'PUT':
      try {
        const { id, title, body, author } = body;
        const updatedPost = await Schema.findByIdAndUpdate(
          id,
          { title, body, author },
          { new: true },
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json({ error: 'Unable to update post' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = body;
        const deletedPost = await Schema.findByIdAndDelete(id);
        res.status(200).json(deletedPost);
      } catch (error) {
        res.status(500).json({ error: 'Unable to delete post' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
