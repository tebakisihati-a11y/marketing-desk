import './style.css';

const icons = {
  overview: '<path d="M3 3h8v8H3zM13 3h8v5h-8zM13 10h8v11h-8zM3 13h8v8H3z"/>',
  tasks: '<path d="m5 12 4 4L19 6"/><path d="M20 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10"/>',
  social: '<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  project: '<path d="M3 7h7l2 2h9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M3 7V5a2 2 0 0 1 2-2h4l2 2h6"/>',
  content: '<path d="M4 5h16M4 12h16M4 19h10"/><circle cx="2.5" cy="5" r=".5"/><circle cx="2.5" cy="12" r=".5"/><circle cx="2.5" cy="19" r=".5"/>',
  plans: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h3M8 17h6"/>',
  activity: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
  reports: '<path d="M4 19V5M4 19h17"/><path d="m7 15 4-5 3 2 5-7"/>',
  chat: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z"/>',
  sales: '<path d="M3 3v18h18"/><path d="m7 14 4-4 4 3 6-7"/>',
  creative: '<path d="M12 3a9 9 0 0 0 0 18h1.5a2.5 2.5 0 0 0 1.8-4.3 1.5 1.5 0 0 1 1.1-2.6H19a2 2 0 0 0 2-2A9 9 0 0 0 12 3Z"/><path d="M7.5 10h.01M11 7h.01M16 9h.01"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  close: '<path d="m18 6-12 12M6 6l12 12"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  pause: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
  play: '<path d="m7 4 13 8-13 8z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
};
const icon = (name, size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.overview}</svg>`;

const navGroups = [
  { label: 'Ruang kerja', links: [['overview', 'Ringkasan'], ['tasks', 'Daily task'], ['activity', 'Activity']] },
  { label: 'Marketing', links: [['social', 'Social media'], ['content', 'Content plan'], ['project', 'Project'], ['plans', 'Plan-plan']] },
  { label: 'Bisnis', links: [['sales', 'Sales'], ['reports', 'Report-report']] },
  { label: 'Kolaborasi', links: [['chat', 'Chat tim'], ['creative', 'Creative']] },
];
const sections = Object.fromEntries(navGroups.flatMap(group => group.links.map(([key, label]) => [key, label])));
const defaultTasks = [
  { id: 1, title: 'Tinjau kalender konten minggu ini', project: 'Brand campaign', due: 'Hari ini', status: 'Berjalan', done: false },
  { id: 2, title: 'Siapkan brief visual untuk carousel', project: 'Social media', due: 'Hari ini', status: 'Perlu ditinjau', done: false },
  { id: 3, title: 'Kirim konsep headline ke Head', project: 'Campaign launch', due: 'Besok', status: 'Belum mulai', done: false },
];
const defaultPosts = [
  { date: '24', month: 'NOV', channel: 'Instagram', title: 'Cerita di balik proses kreatif', status: 'Dalam produksi', color: 'coral' },
  { date: '26', month: 'NOV', channel: 'LinkedIn', title: 'Catatan singkat untuk komunitas', status: 'Menunggu tinjauan', color: 'olive' },
  { date: '28', month: 'NOV', channel: 'Instagram', title: 'Cuplikan kampanye akhir bulan', status: 'Ide', color: 'sand' },
];
const defaultProjects = [
  { name: 'Brand campaign', label: 'Kampanye', progress: 68, color: 'coral', due: 'Akhir bulan' },
  { name: 'Social media', label: 'Konten rutin', progress: 42, color: 'olive', due: 'Berjalan' },
];

function getStored(key, fallback) {
  try { const parsed = JSON.parse(localStorage.getItem(key)); return parsed ?? fallback; } catch { return fallback; }
}
let tasks = getStored('marketing-desk-tasks', defaultTasks);
let posts = getStored('marketing-desk-posts', defaultPosts);
let projects = getStored('marketing-desk-projects', defaultProjects);
let sales = getStored('marketing-desk-sales', []);
let messages = getStored('marketing-desk-chat', [
  { name: 'Ruang tim', initials: 'RT', text: 'Catatan demo: ruang ini siap dipakai untuk diskusi tim setelah data nyata ditambahkan.', time: 'Contoh' },
]);
let activeSection = location.hash.slice(1) in sections ? location.hash.slice(1) : 'overview';
let activeFilter = 'Semua';
let searchText = '';
let mobileMenuOpen = false;
let reportRange = 'Minggu ini';
let systemMessage = '';
let motionPaused = getStored('marketing-desk-motion-paused', false);
let featureTransition = false;

const store = () => {
  localStorage.setItem('marketing-desk-tasks', JSON.stringify(tasks));
  localStorage.setItem('marketing-desk-posts', JSON.stringify(posts));
  localStorage.setItem('marketing-desk-projects', JSON.stringify(projects));
  localStorage.setItem('marketing-desk-sales', JSON.stringify(sales));
  localStorage.setItem('marketing-desk-chat', JSON.stringify(messages));
};

function sidebarMarkup() {
  return `<aside class="sidebar ${mobileMenuOpen ? 'sidebar-open' : ''}" aria-label="Navigasi utama">
    <a class="brand" href="#overview" aria-label="Ruang Marketing, ringkasan"><span class="brand-mark">R.</span><span class="brand-name">ruang<span>marketing</span></span></a>
    <div class="workspace-switcher"><span class="workspace-monogram">RM</span><span class="workspace-copy"><strong>Tim marketing</strong><small>Ruang kerja</small></span></div>
    <nav class="side-nav">${navGroups.map(group => `<div class="nav-group"><p class="nav-group-title">${group.label}</p>${group.links.map(([key, label]) => `<a class="nav-link ${activeSection === key ? 'active' : ''}" href="#${key}" ${activeSection === key ? 'aria-current="page"' : ''}><span class="nav-icon">${icon(key)}</span><span>${label}</span></a>`).join('')}</div>`).join('')}</nav>
    <div class="sidebar-bottom"><div class="head-note"><span class="head-avatar" aria-hidden="true">H</span><div><strong>Ruang Head</strong><small>Area contoh untuk persetujuan</small></div></div><button class="help-link" type="button" data-action="help">${icon('activity', 17)} Panduan ruang kerja</button></div>
  </aside>`;
}

function topbarMarkup() {
  return `<header class="topbar"><button class="mobile-menu-button" type="button" aria-label="Buka menu" aria-expanded="${mobileMenuOpen}">${icon(mobileMenuOpen ? 'close' : 'menu', 20)}</button><div class="breadcrumb"><span>Tim marketing</span><span class="crumb-slash">/</span><strong>${sections[activeSection]}</strong></div><div class="topbar-actions"><label class="search-field">${icon('search', 17)}<span class="visually-hidden">Cari di ruang kerja</span><input type="search" placeholder="Cari apa saja" value="${escapeHtml(searchText)}" data-search /><kbd>⌘ K</kbd></label><button class="icon-button" type="button" data-action="motion-toggle" aria-pressed="${motionPaused}">${icon(motionPaused ? 'play' : 'pause', 16)}</button><button class="icon-button" type="button" data-action="theme" aria-label="Ganti tema terang atau gelap">${icon('sun', 18)}</button><span class="profile-initials" aria-label="Pratinjau demo">Demo</span></div></header>`;
}

function pageHeading(title, description, action = '') {
  return `<div class="page-heading"><div><p class="page-kicker">Ruang kerja marketing</p><h1>${title}</h1><p class="page-description">${description}</p></div>${action}</div>`;
}

function taskRows(list = tasks) {
  const filtered = list.filter(task => (activeFilter === 'Semua' || (activeFilter === 'Selesai' ? task.done : task.status === activeFilter)) && `${task.title} ${task.project}`.toLowerCase().includes(searchText.toLowerCase()));
  if (!filtered.length) return `<div class="empty-state"><span class="empty-mark">${icon('check', 21)}</span><strong>${list.length ? 'Tidak ada tugas yang cocok' : 'Belum ada tugas untuk hari ini'}</strong><p>${list.length ? 'Ubah kata pencarian atau filter untuk melihat tugas lain.' : 'Tambahkan tugas agar tim tahu hal yang perlu dikerjakan.'}</p>${list.length ? '' : '<button class="text-button" type="button" data-action="new-task">Buat tugas pertama</button>'}</div>`;
  return `<div class="task-list">${filtered.map(task => `<article class="task-row ${task.done ? 'task-done' : ''}"><button type="button" class="task-check ${task.done ? 'checked' : ''}" data-action="toggle-task" data-id="${task.id}" aria-label="${task.done ? 'Tandai belum selesai' : 'Tandai selesai'}: ${escapeHtml(task.title)}">${task.done ? icon('check', 15) : ''}</button><div class="task-copy"><strong>${escapeHtml(task.title)}</strong><span>${escapeHtml(task.project)}</span></div><span class="status-tag ${statusClass(task.status)}">${task.done ? 'Selesai' : escapeHtml(task.status)}</span><span class="task-due">${escapeHtml(task.due)}</span></article>`).join('')}</div>`;
}
function statusClass(status) {
  if (status === 'Berjalan' || status === 'Dalam produksi') return 'status-active';
  if (status === 'Perlu ditinjau' || status === 'Menunggu tinjauan') return 'status-review';
  if (status === 'Selesai') return 'status-done';
  return 'status-neutral';
}
function filterMarkup() {
  const filters = ['Semua', 'Berjalan', 'Perlu ditinjau', 'Selesai'];
  return `<div class="filter-tabs" role="group" aria-label="Filter tugas">${filters.map(filter => `<button class="filter-tab ${activeFilter === filter ? 'selected' : ''}" type="button" data-action="filter" data-filter="${filter}" aria-pressed="${activeFilter === filter}">${filter}</button>`).join('')}</div>`;
}

function overviewPage() {
  const openTasks = tasks.filter(task => !task.done).length;
  const reviewPosts = posts.filter(post => post.status.includes('tinjauan')).length;
  const dateLabel = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }).format(new Date());
  return `<main class="main-content">${pageHeading('Hai, tim! Ada apa hari ini?', 'Kumpulkan ide, bagi tugas, lalu bikin kampanye jadi nyata.', '<button class="primary-button" type="button" data-action="new-task">'+icon('plus',17)+' Catat tugas</button>')}
    <div class="demo-notice">${icon('activity',16)} <span><strong>Mode contoh.</strong> Data tersimpan hanya di browser ini. Pakai data tim sendiri sebelum dibagikan.</span><button type="button" data-action="dismiss-notice" aria-label="Tutup pemberitahuan">${icon('close',15)}</button></div>
    <section class="pulse-strip" aria-label="Ringkasan kerja"><div class="pulse-intro"><span class="pulse-label">Papan hari ini</span><strong>Mulai dari yang kecil</strong><small>Catatan kerja ruang ini</small></div><div class="pulse-item"><span>Tugas di meja</span><strong>${openTasks}</strong><small>Belum ditandai selesai</small></div><div class="pulse-item"><span>Perlu dilihat</span><strong>${reviewPosts}</strong><small>Konten menunggu tinjauan</small></div><div class="pulse-item"><span>Proyek aktif</span><strong>${projects.length}</strong><small>Dalam ruang kerja ini</small></div><div class="pulse-date"><span>Tanggal hari ini</span><strong>${escapeHtml(dateLabel)}</strong></div></section>
    <div class="work-grid"><section class="work-panel task-panel"><div class="panel-heading"><div><span class="panel-index">Kerja harian</span><h2>Yang lagi dikerjakan</h2></div><a class="quiet-link" href="#tasks">Semua tugas ${icon('arrow', 15)}</a></div>${filterMarkup()}<div id="task-list-region">${taskRows()}</div></section>
    <section class="work-panel calendar-panel"><div class="panel-heading"><div><span class="panel-index">Di kalender</span><h2>Konten selanjutnya</h2></div><a class="quiet-link" href="#social">Buka kalender ${icon('arrow', 15)}</a></div><div class="post-stack">${posts.slice(0, 3).map(post => `<article class="post-row"><div class="date-paper ${post.color}"><strong>${escapeHtml(post.date)}</strong><span>${escapeHtml(post.month)}</span></div><div class="post-copy"><span>${escapeHtml(post.channel)} <i>·</i> ${escapeHtml(post.status)}</span><strong>${escapeHtml(post.title)}</strong></div><button type="button" class="more-button" data-action="post-menu" data-id="${post.id || ''}" aria-label="Hapus ${escapeHtml(post.title)}" ${post.id ? '' : 'disabled'}>${icon('more')}</button></article>`).join('') || '<div class="empty-state compact"><strong>Belum ada konten</strong><p>Tambahkan ide pertama ke kalender.</p><button class="text-button" type="button" data-action="new-post">Tambah konten</button></div>'}</div><button class="add-row-button" type="button" data-action="new-post">${icon('plus', 16)} Tambah ke kalender</button></section></div>
    <section class="project-section"><div class="panel-heading"><div><span class="panel-index">Lagi digarap</span><h2>Meja proyek</h2></div><a class="quiet-link" href="#project">Semua proyek ${icon('arrow', 15)}</a></div>${projects.length ? `<div class="project-ribbon">${projects.slice(0, 3).map(project => `<article class="project-item"><div class="project-title"><span class="project-chip ${project.color}" aria-hidden="true"></span><div><strong>${escapeHtml(project.name)}</strong><small>${escapeHtml(project.label)}</small></div><button type="button" class="more-button" data-action="project-menu" data-name="${escapeHtml(project.name)}" aria-label="Hapus proyek ${escapeHtml(project.name)}">${icon('more')}</button></div><div class="progress-track" role="progressbar" aria-label="Progres ${escapeHtml(project.name)}" aria-valuenow="${project.progress}" aria-valuemin="0" aria-valuemax="100"><span class="progress-fill ${project.color}" style="width:${project.progress}%"></span></div><div class="project-foot"><span>${project.progress}% selesai</span><span>${escapeHtml(project.due)}</span></div></article>`).join('')}<button type="button" class="new-project-tile" data-action="new-project">${icon('plus', 17)}<span>Buat proyek</span></button></div>` : '<div class="empty-state compact"><strong>Belum ada proyek</strong><p>Buat proyek pertama untuk mengelompokkan tugas tim.</p><button class="text-button" type="button" data-action="new-project">Buat proyek</button></div>'}</section>
    <footer class="page-footer"><span>Ruang Marketing <i>·</i> contoh lokal</span><button type="button" data-action="reset-demo">Atur ulang data contoh</button></footer></main>`;
}

function tasksPage() {
  return `<main class="main-content">${pageHeading('Daily task', 'Susun prioritas, perbarui progres, dan tandai pekerjaan yang selesai.', '<button class="primary-button" type="button" data-action="new-task">' + icon('plus', 17) + ' Tambah tugas</button>')}<section class="work-panel full-panel"><div class="panel-heading"><div><span class="panel-index">DAFTAR KERJA</span><h2>Tugas tim</h2></div><span class="record-count">${tasks.filter(task => !task.done).length} terbuka</span></div>${filterMarkup()}<div id="task-list-region">${taskRows()}</div></section><footer class="page-footer"><span>Data contoh tersimpan lokal di perangkat ini.</span></footer></main>`;
}

function postListMarkup() {
  const matchingPosts = posts.filter(post => `${post.title} ${post.channel} ${post.status}`.toLowerCase().includes(searchText.toLowerCase()));
  return matchingPosts.length ? matchingPosts.map(post => `<article class="post-table-row"><div class="date-paper ${post.color}"><strong>${escapeHtml(post.date)}</strong><span>${escapeHtml(post.month)}</span></div><div class="post-copy"><span>${escapeHtml(post.channel)}</span><strong>${escapeHtml(post.title)}</strong></div><span class="status-tag ${statusClass(post.status)}">${escapeHtml(post.status)}</span><button type="button" class="more-button" data-action="delete-post" data-id="${post.id || ''}" aria-label="Hapus ${escapeHtml(post.title)}" ${post.id ? '' : 'disabled'}>${icon('more')}</button></article>`).join('') : `<div class="empty-state"><strong>${posts.length ? 'Tidak ada konten yang cocok' : 'Kalender masih kosong'}</strong><p>${posts.length ? 'Ubah kata pencarian untuk melihat konten lain.' : 'Tambahkan ide konten untuk mulai menyusun jadwal publikasi.'}</p>${posts.length ? '' : '<button class="text-button" type="button" data-action="new-post">Tambah ide konten</button>'}</div>`;
}
function socialPage() {
  return `<main class="main-content">${pageHeading('Social media', 'Kalender ide dan publikasi untuk kanal sosial tim.', '<button class="primary-button" type="button" data-action="new-post">' + icon('plus', 17) + ' Tambah konten</button>')}<section class="work-panel full-panel"><div class="panel-heading"><div><span class="panel-index">KALENDER KONTEN</span><h2>Rencana publikasi</h2></div><button type="button" class="secondary-button" data-action="new-post">${icon('plus', 16)} Tambah ide</button></div><div class="post-table" id="post-search-region">${postListMarkup()}</div></section></main>`;
}

function projectsPage() {
  return `<main class="main-content">${pageHeading('Project', 'Pantau arah, progres, dan pekerjaan di tiap kampanye.', '<button class="primary-button" type="button" data-action="new-project">' + icon('plus', 17) + ' Buat proyek</button>')}<section class="work-panel full-panel"><div class="panel-heading"><div><span class="panel-index">PAPAN PROYEK</span><h2>Yang sedang dikerjakan</h2></div></div>${projects.length ? `<div class="project-list">${projects.map(project => `<article class="project-list-row"><span class="project-chip ${project.color}"></span><div class="project-list-name"><strong>${escapeHtml(project.name)}</strong><small>${escapeHtml(project.label)}</small></div><div class="project-list-progress"><div class="progress-track"><span class="progress-fill ${project.color}" style="width:${project.progress}%"></span></div><span>${project.progress}%</span></div><span class="status-tag status-active">${escapeHtml(project.due)}</span></article>`).join('')}</div>` : '<div class="empty-state"><strong>Belum ada proyek</strong><p>Buat proyek untuk mengelompokkan kampanye dan tugas.</p><button class="text-button" type="button" data-action="new-project">Buat proyek pertama</button></div>'}</section></main>`;
}

function contentPage(kind) {
  const activityItems = [...tasks.map(task => ({head:task.done?'Tugas ditandai selesai':'Tugas diperbarui',sub:task.title})), ...posts.map(post=>({head:'Konten dalam kalender',sub:post.title}))];
  const cfg = {
    content: { title: 'Content plan', description: 'Kelola brief, naskah, dan materi yang sedang disiapkan.', kicker: 'ALUR KONTEN', items: posts.map(post => ({ head: post.title, sub: `${post.channel} · ${post.status}` })), action: 'new-post', button: 'Tambah brief', empty: 'Belum ada brief konten' },
    plans: { title: 'Plan-plan', description: 'Simpan sasaran dan rencana kerja yang menjadi pegangan tim.', kicker: 'ARAH KERJA', items: projects.map(project => ({ head: project.name, sub: `${project.label} · Target: ${project.due}` })), action: 'new-project', button: 'Tambah rencana', empty: 'Belum ada rencana' },
    activity: { title: 'Activity', description: 'Catatan perubahan dan aktivitas yang terekam di ruang kerja ini.', kicker: 'RIWAYAT LOKAL', items: activityItems, action: 'refresh', button: 'Muat ulang', empty: 'Aktivitas akan muncul setelah Anda mengubah data' },
    creative: { title: 'Creative', description: 'Kumpulkan arahan kreatif dan materi yang perlu ditinjau.', kicker: 'RUANG KREATIF', items: posts.map(post => ({ head: post.title, sub: `Brief ${post.channel} · ${post.status}` })), action: 'new-post', button: 'Tambah brief kreatif', empty: 'Belum ada brief kreatif' },
    sales: { title: 'Sales', description: 'Catat peluang, tindak lanjut, dan informasi penjualan tim.', kicker: 'CATATAN SALES', items: sales.map(item => ({head:item.name, sub:item.followup})), action: 'new-sale', button: 'Tambah catatan sales', empty: 'Belum ada catatan sales' },
  }[kind];
  return `<main class="main-content">${pageHeading(cfg.title, cfg.description, `<button class="primary-button" type="button" data-action="${cfg.action}">${icon('plus', 17)} ${cfg.button}</button>`)}<section class="work-panel full-panel"><div class="panel-heading"><div><span class="panel-index">${cfg.kicker}</span><h2>${cfg.title}</h2></div></div>${cfg.items.length ? `<div class="simple-list">${cfg.items.map(item => `<article><span class="simple-list-mark"></span><div><strong>${escapeHtml(item.head)}</strong><small>${escapeHtml(item.sub)}</small></div></article>`).join('')}</div>` : `<div class="empty-state"><span class="empty-mark">${icon(kind === 'sales' ? 'sales' : 'content', 20)}</span><strong>${cfg.empty}</strong><p>Tambahkan data nyata tim untuk mulai memakai ruang ini.</p><button class="text-button" type="button" data-action="${cfg.action}">${cfg.button}</button></div>`}</section><p class="page-note">Isi pada halaman ini merupakan contoh lokal, belum tersambung ke anggota tim lain.</p></main>`;
}

function reportsPage() {
  const complete = tasks.filter(task => task.done).length;
  const all = tasks.length;
  const percent = all ? Math.round(complete / all * 100) : 0;
  return `<main class="main-content">${pageHeading('Report-report', 'Lihat ringkasan dari pekerjaan yang tercatat di browser ini.', '')}<section class="report-toolbar"><div><span class="panel-index">RENTANG LAPORAN</span><strong>Ringkasan kerja tim</strong></div><label class="select-wrap"><span class="visually-hidden">Rentang laporan</span><select data-report-range><option ${reportRange === 'Minggu ini' ? 'selected' : ''}>Minggu ini</option><option ${reportRange === 'Bulan ini' ? 'selected' : ''}>Bulan ini</option><option ${reportRange === 'Semua data' ? 'selected' : ''}>Semua data</option></select></label></section><div class="report-layout"><section class="work-panel report-main"><div class="panel-heading"><div><span class="panel-index">PROGRES TUGAS</span><h2>Penyelesaian pekerjaan</h2></div><span class="report-value">${percent}%</span></div><div class="report-bar"><span style="width:${percent}%"></span></div><p class="report-caption">${complete} dari ${all} tugas contoh ditandai selesai. Angka berubah saat data diperbarui.</p></section><section class="report-side"><article><span>Catatan konten</span><strong>${posts.length}</strong><small>Item dalam kalender contoh</small></article><article><span>Proyek tercatat</span><strong>${projects.length}</strong><small>Data contoh lokal</small></article></section></div><div class="demo-notice report-disclaimer">${icon('activity', 16)} <span>Ringkasan ini dihitung dari data lokal di perangkat, bukan laporan lintas tim.</span></div></main>`;
}

function chatPage() {
  return `<main class="main-content">${pageHeading('Chat antar tim dan Head', 'Ruang diskusi untuk membahas pekerjaan dan meminta persetujuan.', '')}<section class="work-panel chat-panel"><div class="chat-header"><div><span class="panel-index">RUANG DISKUSI</span><h2>Tim marketing</h2></div><span class="local-tag">Mode demo lokal</span></div><div class="chat-messages" aria-live="polite">${messages.length ? messages.map(message => `<article class="chat-message"><div class="chat-avatar">${escapeHtml(message.initials)}</div><div class="message-body"><div><strong>${escapeHtml(message.name)}</strong><span>${escapeHtml(message.time)}</span></div><p>${escapeHtml(message.text)}</p></div></article>`).join('') : '<div class="empty-state compact"><strong>Belum ada percakapan</strong><p>Tulis pesan pertama untuk membuka diskusi lokal ini.</p></div>'}</div><form class="chat-form" id="chat-form"><label class="visually-hidden" for="chat-input">Tulis pesan untuk tim</label><input id="chat-input" name="message" required maxlength="500" placeholder="Tulis pesan untuk tim…" /><button class="primary-button" type="submit">Kirim</button></form><p class="chat-hint">Pesan tersimpan di browser ini saja. Untuk chat bersama, aplikasi perlu backend dan akun tim.</p></section></main>`;
}

function pageFor(key) {
  if (key === 'overview') return overviewPage();
  if (key === 'tasks') return tasksPage();
  if (key === 'social') return socialPage();
  if (key === 'project') return projectsPage();
  if (key === 'reports') return reportsPage();
  if (key === 'chat') return chatPage();
  return contentPage(key);
}

function render() {
  document.querySelector('#app').innerHTML = `<div class="motion-layer" aria-hidden="true"><span class="drift-note drift-note-one"></span><span class="drift-note drift-note-two"></span></div>${sidebarMarkup()}<div class="app-shell ${mobileMenuOpen ? 'menu-visible' : ''}">${topbarMarkup()}${systemMessage ? `<div class="toast" role="status">${escapeHtml(systemMessage)}</div>` : ''}${pageFor(activeSection)}</div><button class="mobile-scrim ${mobileMenuOpen ? 'visible' : ''}" type="button" aria-label="Tutup menu" data-action="close-menu"></button>`;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.classList.toggle('reduce-motion', reduceMotion);
  document.body.classList.toggle('motion-ready', !reduceMotion);
  document.body.classList.toggle('motion-paused', motionPaused || reduceMotion);
  const main = document.querySelector('.main-content');
  if (main && !reduceMotion && !motionPaused) {
    const arrivalClass = featureTransition ? 'feature-arrive' : 'screen-arrive';
    main.classList.remove('screen-arrive', 'feature-arrive');
    requestAnimationFrame(() => {
      if (main.isConnected) main.classList.add(arrivalClass);
    });
  }
  const motionToggle = document.querySelector('[data-action="motion-toggle"]');
  if (motionToggle) {
    motionToggle.setAttribute('aria-pressed', String(motionPaused || reduceMotion));
    const shouldPause = motionPaused || reduceMotion;
    motionToggle.setAttribute('aria-label', reduceMotion ? 'Animasi dinonaktifkan karena pengaturan pengurangan gerak' : shouldPause ? 'Lanjutkan animasi latar' : 'Jeda animasi latar');
    motionToggle.setAttribute('aria-disabled', String(reduceMotion));
    motionToggle.title = reduceMotion ? 'Pengaturan perangkat mengurangi gerakan' : shouldPause ? 'Lanjutkan gerak latar' : 'Jeda gerak latar';
    motionToggle.disabled = reduceMotion;
    motionToggle.innerHTML = icon(shouldPause ? 'play' : 'pause', 16);
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}

function showToast(message) {
  systemMessage = message;
  render();
  window.setTimeout(() => { systemMessage = ''; render(); }, 2800);
}
function openDialog(title, body, submitText = 'Simpan') {
  document.querySelector('.dialog-scrim')?.remove();
  const scrim = document.createElement('div');
  scrim.className = 'dialog-scrim';
  scrim.dataset.action = 'close-dialog';
  scrim.innerHTML = `<section class="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><div class="dialog-heading"><h2 id="dialog-title">${title}</h2><button type="button" class="icon-button" data-action="close-dialog" aria-label="Tutup dialog">${icon('close')}</button></div><form id="modal-form">${body}<div class="dialog-actions"><button type="button" class="secondary-button" data-action="close-dialog">Batal</button><button type="submit" class="primary-button">${submitText}</button></div></form></section>`;
  document.body.append(scrim);
  document.querySelector('.dialog input, .dialog textarea')?.focus();
}
function field(label, name, placeholder, type = 'text') {
  return `<label class="form-field"><span>${label}</span><input name="${name}" type="${type}" placeholder="${placeholder}" required /></label>`;
}
function openTaskDialog() {
  openDialog('Tambah tugas', `${field('Nama tugas', 'title', 'Contoh: Tinjau draft konten')}<div class="form-row">${field('Project', 'project', 'Nama project')}${field('Batas waktu', 'due', 'Contoh: Besok')}</div><label class="form-field"><span>Status</span><select name="status"><option>Belum mulai</option><option>Berjalan</option><option>Perlu ditinjau</option></select></label>`);
}
function openPostDialog() {
  openDialog('Tambah konten', `${field('Judul konten', 'title', 'Topik atau judul publikasi')}<div class="form-row">${field('Kanal', 'channel', 'Contoh: Instagram')}${field('Tanggal', 'date', 'Contoh: 30 Nov')}</div><label class="form-field"><span>Status</span><select name="status"><option>Ide</option><option>Dalam produksi</option><option>Menunggu tinjauan</option></select></label>`);
}
function openProjectDialog() {
  openDialog('Buat proyek', `${field('Nama proyek', 'name', 'Nama kampanye atau proyek')}${field('Jenis pekerjaan', 'label', 'Contoh: Kampanye')}${field('Target waktu', 'due', 'Contoh: Akhir bulan')}`);
}
function openSaleDialog() {
  openDialog('Catatan sales', `${field('Nama peluang', 'name', 'Nama prospek atau peluang')}${field('Tindak lanjut', 'followup', 'Langkah berikutnya')}`);
}
function formatDateLabel(input) {
  const value = input.trim();
  return value || 'Belum diatur';
}

function handleAction(target, event) {
  const action = target.closest('[data-action]');
  if (!action) return;
  if (action.tagName === 'A' && action.href && action.origin === location.origin) return;
  const { action: name, id } = action.dataset;
  if (name === 'filter') { activeFilter = action.dataset.filter; render(); }
  else if (name === 'toggle-task') { tasks = tasks.map(task => String(task.id) === id ? { ...task, done: !task.done, status: task.done ? 'Berjalan' : 'Selesai' } : task); store(); render(); }
  else if (name === 'new-task') openTaskDialog();
  else if (name === 'new-post') openPostDialog();
  else if (name === 'new-project') openProjectDialog();
  else if (name === 'new-sale') openSaleDialog();
  else if (name === 'close-dialog') { if (action.classList.contains('dialog-scrim') && !event.target.closest('.dialog')) action.remove(); else document.querySelector('.dialog-scrim')?.remove(); }
  else if (name === 'close-menu') { mobileMenuOpen = false; render(); }
  else if (name === 'dismiss-notice') { action.closest('.demo-notice').remove(); }
  else if (name === 'theme') { document.body.classList.toggle('dark-mode'); localStorage.setItem('marketing-desk-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light'); }
  else if (name === 'motion-toggle') { motionPaused = !motionPaused; localStorage.setItem('marketing-desk-motion-paused', JSON.stringify(motionPaused)); render(); }
  else if (name === 'profile') showToast('Profil contoh, pengaturan akun belum disambungkan.');
  else if (name === 'help') showToast('Panduan: pilih menu di kiri, lalu gunakan tombol tambah untuk mencatat pekerjaan.');
  else if (name === 'post-menu') { const post = posts.find(item => String(item.id) === id); if (post && window.confirm(`Hapus konten “${post.title}”?`)) { posts = posts.filter(item => String(item.id) !== id); store(); render(); showToast('Konten dihapus dari data lokal.'); } }
  else if (name === 'project-menu') { const project = projects.find(item => item.name === action.dataset.name); if (project && window.confirm(`Hapus proyek “${project.name}”?`)) { projects = projects.filter(item => item !== project); store(); render(); showToast('Proyek dihapus dari data lokal.'); } }
  else if (name === 'delete-post') { const post = posts.find(item => String(item.id) === id); if (post && window.confirm(`Hapus konten “${post.title}”?`)) { posts = posts.filter(item => String(item.id) !== id); store(); render(); showToast('Konten dihapus dari data lokal.'); } else if (!post) showToast('Data contoh hanya dapat dihapus setelah ditambahkan sebagai item baru.'); }
  else if (name === 'more-info') showToast('Data contoh. Tambahkan backend sebelum dibagikan ke tim.');
  else if (name === 'refresh') { render(); showToast('Aktivitas lokal dimuat ulang.'); }
  else if (name === 'reset-demo') { tasks = defaultTasks.map(task => ({ ...task })); posts = defaultPosts.map(post => ({ ...post })); projects = defaultProjects.map(project => ({ ...project })); sales = []; messages = [{ name: 'Ruang tim', initials: 'RT', text: 'Catatan demo: ruang ini siap dipakai untuk diskusi tim setelah data nyata ditambahkan.', time: 'Contoh' }]; store(); activeFilter = 'Semua'; render(); }
}

document.addEventListener('click', event => {
  const pressed = event.target.closest('button:not(:disabled)');
  if (pressed && !motionPaused && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    pressed.classList.remove('tap-bounce');
    void pressed.offsetWidth;
    pressed.classList.add('tap-bounce');
    window.setTimeout(() => pressed.classList.remove('tap-bounce'), 420);
  }
  if (event.target.closest('#modal-form [type="submit"]')) {
    event.preventDefault();
    const form = document.querySelector('#modal-form');
    if (form?.reportValidity()) saveModalForm(form);
    return;
  }
  handleAction(event.target, event);
  if (event.target.closest('.mobile-menu-button')) { mobileMenuOpen = !mobileMenuOpen; render(); }
});
document.addEventListener('input', event => {
  if (event.target.matches('[data-search]')) {
    searchText = event.target.value;
    const region = document.querySelector('#task-list-region');
    if (region) region.innerHTML = taskRows();
    const postsRegion = document.querySelector('#post-search-region');
    if (postsRegion) postsRegion.innerHTML = postListMarkup();
  }
});
document.addEventListener('change', event => {
  if (event.target.matches('[data-report-range]')) { reportRange = event.target.value; showToast(`Rentang laporan: ${reportRange}`); }
});
function saveModalForm(form) {
  const values = Object.fromEntries(new FormData(form));
  const title = document.querySelector('#dialog-title').textContent;
  if (title === 'Tambah tugas') tasks.unshift({ id: Date.now(), title: values.title, project: values.project, due: formatDateLabel(values.due), status: values.status, done: false });
  else if (title === 'Tambah konten') posts.unshift({ id: Date.now(), date: values.date.replace(/\D/g, '').slice(0, 2) || '--', month: values.date.replace(/[0-9\s]/g, '').slice(0, 3).toUpperCase() || 'TBD', channel: values.channel, title: values.title, status: values.status, color: ['coral', 'olive', 'sand'][posts.length % 3] });
  else if (title === 'Buat proyek') projects.unshift({ name: values.name, label: values.label, progress: 0, color: ['coral', 'olive', 'sand'][projects.length % 3], due: values.due });
  else if (title === 'Catatan sales') sales.unshift({name:values.name,followup:values.followup});
  store(); document.querySelector('.dialog-scrim')?.remove(); render(); showToast('Data tersimpan di browser ini.');
}
document.addEventListener('submit', event => {
  if (event.target.id === 'modal-form') { event.preventDefault(); saveModalForm(event.target); }
  else if (event.target.id === 'chat-form') {
    event.preventDefault(); const input = event.target.elements.message; const text = input.value.trim(); if (!text) return;
    messages.push({ name: 'Anda', initials: 'AR', text, time: 'Baru saja' }); store(); render(); document.querySelector('#chat-input')?.focus();
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') { document.querySelector('.dialog-scrim')?.remove(); if (mobileMenuOpen) { mobileMenuOpen = false; render(); } }
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); document.querySelector('[data-search]')?.focus(); }
});
window.addEventListener('hashchange', () => { const next = location.hash.slice(1); if (next in sections) { activeSection = next; mobileMenuOpen = false; featureTransition = true; render(); featureTransition = false; } });
if (localStorage.getItem('marketing-desk-theme') === 'dark') document.body.classList.add('dark-mode');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
motionPreference.addEventListener('change', () => render());
render();
