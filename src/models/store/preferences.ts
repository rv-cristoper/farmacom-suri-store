export type ModalData = {
  children: React.ReactNode;
  containerClassName?: string;
  callback?: () => void;
  noCloseButton?: boolean;
};

export interface PreferencesState {
  modalData: ModalData;
  setModalData: (value: ModalData) => void;
}
