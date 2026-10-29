import { PendingUploads } from './pending-uploads';

describe('PendingUploads', () => {
  let discarded: string[];
  let pending: PendingUploads;

  beforeEach(() => {
    discarded = [];
    pending = new PendingUploads(url => discarded.push(url));
  });

  it('discards a pending upload when it is removed', () => {
    pending.add('a');
    pending.removed('a');
    expect(discarded).toEqual(['a']);
  });

  it('does not discard images that were not uploaded in this form (already saved)', () => {
    pending.removed('saved-before');
    pending.removed(null);
    expect(discarded).toEqual([]);
  });

  it('on save discards only the uploads that were not saved', () => {
    pending.add('kept');
    pending.add('dropped');
    pending.committed(['kept', 'other']);
    expect(discarded).toEqual(['dropped']);

    pending.discardAll();
    expect(discarded).toEqual(['dropped']);
  });

  it('discardAll discards every pending upload once', () => {
    pending.add('a');
    pending.add('b');
    pending.discardAll();
    pending.discardAll();
    expect(discarded).toEqual(['a', 'b']);
  });
});
