import {create} from 'zustand';

import {IBook} from '@/types';

interface PreviewModalStore {
  isOpen: boolean;
  data?: IBook;
  onOpen: (data: IBook) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: IBook) => set({isOpen: true, data}),
  onClose: () => set({isOpen: false}),
}));

export default usePreviewModal;
