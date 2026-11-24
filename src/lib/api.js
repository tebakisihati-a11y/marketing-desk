import { supabase, isConfigured } from './supabase.js';

// Semua fungsi mengembalikan promise. Jika Supabase tidak dikonfigurasi,
// caller (main.js) pakai fallback localStorage.

export async function loadAll() {
  if (!isConfigured) return null;
  const [tasks, posts, projects, sales, messages] = await Promise.all([
    supabase.from('tasks').select('*').order('created_at', { ascending: false }),
    supabase.from('posts').select('*').order('created_at', { ascending: false }),
    supabase.from('projects').select('*').order('created_at', { ascending: false }),
    supabase.from('sales').select('*').order('created_at', { ascending: false }),
    supabase.from('messages').select('*').order('created_at', { ascending: true }),
  ]);
  for (const { error } of [tasks, posts, projects, sales, messages]) {
    if (error) throw error;
  }
  return {
    tasks: tasks.data.map(t => ({ ...t, done: t.done, status: t.status })),
    posts: posts.data.map(p => ({ ...p, color: p.color || 'coral' })),
    projects: projects.data.map(p => ({ ...p, progress: p.progress ?? 0 })),
    sales: sales.data,
    messages: messages.data.map(m => ({ name: m.author, initials: m.author?.slice(0, 2).toUpperCase() || '??', text: m.text, time: m.created_at })),
  };
}

export async function addTask(task) {
  if (!isConfigured) return null;
  const { error } = await supabase.from('tasks').insert({
    title: task.title, project: task.project, due: task.due, status: task.status, done: false,
  });
  if (error) throw error;
}

export async function toggleTask(id, done, status) {
  if (!isConfigured) return null;
  const { error } = await supabase.from('tasks').update({ done, status }).eq('id', id);
  if (error) throw error;
}

export async function deleteTask(id) {
  if (!isConfigured) return null;
  const { error } = await supabase.from('tasks').delete().eq('id', id);
  if (error) throw error;
}

export async function addPost(post) {
  if (!isConfigured) return null;
  const { error } = await supabase.from('posts').insert({
    title: post.title, channel: post.channel, date: post.date, month: post.month, status: post.status, color: post.color,
  });
  if (error) throw error;
}

export async function deletePost(id) {
  if (!isConfigured) return null;
  const { error } = await supabase.from('posts').delete().eq('id', id);
  if (error) throw error;
}

export async function addProject(project) {
  if (!isConfigured) return null;
  const { error } = await supabase.from('projects').insert({
    name: project.name, label: project.label, progress: project.progress ?? 0, color: project.color, due: project.due,
  });
  if (error) throw error;
}

export async function deleteProject(name) {
  if (!isConfigured) return null;
  const { error } = await supabase.from('projects').delete().eq('name', name);
  if (error) throw error;
}

export async function addSale(sale) {
  if (!isConfigured) return null;
  const { error } = await supabase.from('sales').insert({ name: sale.name, followup: sale.followup });
  if (error) throw error;
}

export async function addMessage(text, author = 'Anda') {
  if (!isConfigured) return null;
  const { error } = await supabase.from('messages').insert({ text, author });
  if (error) throw error;
}
