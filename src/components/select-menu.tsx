import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../components/ui/select";

export type TOption = {
  label: string;
  value: string;
};

type TProps = {
  options: TOption[];
  placeholder?: string;
  className?: string;
  icon?: boolean;
  handleChange?: (value: string, name: string) => void;
  contentClassName?: string;
  itemClassName?: string;
  defaultValue?: string | number | boolean;
  disabled?: boolean;
  name?: string
  loadingItems?: boolean
};

function SelectMenu(props: TProps) {
  const { options, placeholder = "Seleccione un elemento", defaultValue, className, contentClassName, itemClassName, handleChange = () => { }, disabled = false, name = '', loadingItems = false } = props;
  return (
    <Select
      defaultValue={defaultValue as string | undefined}
      onValueChange={(value: string) => handleChange(value, name)}
      disabled={options.length ? disabled : true}
      name={name}
      value={defaultValue as string | undefined}
    >
      <SelectTrigger className={`${className || ""} w-full`}>
        <SelectValue
          placeholder={
            <p className="text-text_gray opacity-50 font-normal">
              {loadingItems ? "Cargando..." : options.length ? placeholder : "Sin elementos por seleccionar"}
            </p>
          }
          defaultValue={defaultValue as string | undefined}
        />
      </SelectTrigger>
      <SelectContent className={`z-[101] ${contentClassName || ""}`}>
        {options?.map((option: TOption, index: number) => (
          <SelectItem
            className={`${itemClassName || ""}`}
            value={option.value}
            key={index}
          >
            <div className="flex items-center gap-2">
              <span>{option.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectMenu;
