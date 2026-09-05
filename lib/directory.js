import dataset from '@/data/maharashtra_government_websites_igod.json';

export const slugify = (value) => encodeURIComponent(String(value).toLowerCase().replace(/\//g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
export const unslugify = (slug, values) => values.find((value) => slugify(value) === slug);
export const records = dataset.records;
export const categories = [...new Set(records.map((record) => record.category))].sort();
export const departments = [...new Set(records.map((record) => record.department).filter(Boolean))].sort();
export const categoryData = categories.map((category) => ({ name: category, slug: slugify(category), count: records.filter((record) => record.category === category).length }));
export const departmentData = departments.map((department) => ({ name: department, slug: slugify(department), count: records.filter((record) => record.department === department).length }));
export const schemes = records.filter((record) => record.category.includes('Scheme'));
export const schemeData = schemes.map((record) => ({ ...record, slug: slugify(record.name) }));
export const findScheme = (slug) => schemeData.find((scheme) => scheme.slug === slug);
export const sourceInfo = { title: dataset.dataset_title, source: dataset.source, lastVerified: dataset.last_verified, total: records.length };
