'use client';
import { useLanguage } from '@/components/LanguageProvider';

export default function LocalizedText({ id }) {
  const { t } = useLanguage();
  return t(id);
}
