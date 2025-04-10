import React, { FC } from 'react';

import { Button, Pagination, Selection } from '@heroui/react';

interface TableFooterProps {
  filteredItemsLength: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  page: number;
  pages: number;
  selectedKeys: Selection;
  setPage: (page: number) => void;
}

export const TableFooter: FC<TableFooterProps> = ({
  filteredItemsLength,
  onNextPage,
  onPreviousPage,
  page,
  pages,
  selectedKeys,
  setPage,
}) => {
  return (
    <div className="flex items-center justify-between px-2 py-2">
      <span className="w-[30%] text-small text-default-400">
        {selectedKeys === 'all'
          ? 'All items selected'
          : `${selectedKeys.size} of ${filteredItemsLength} selected`}
      </span>

      <Pagination
        color="primary"
        isCompact
        onChange={setPage}
        page={page}
        showControls
        showShadow
        total={pages}
      />

      <div className="hidden w-[30%] justify-end gap-2 sm:flex">
        <Button isDisabled={pages === 1} onPress={onPreviousPage} size="sm" variant="flat">
          Previous
        </Button>
        <Button isDisabled={pages === 1} onPress={onNextPage} size="sm" variant="flat">
          Next
        </Button>
      </div>
    </div>
  );
};
