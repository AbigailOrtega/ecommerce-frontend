import { Category } from './models';

/** The categories the store shows: hidden ones are only for the admin. */
export function visibleCategories(categories: Category[] | null | undefined): Category[] {
  return (categories ?? []).filter(c => c.visible !== false);
}
