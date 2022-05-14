import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

type SelectBoxProps = {
  /** 表示ラベル */
  label: string;
  /** 選択されたアイテム */
  selectedItem: string;
  /** 必須項目か */
  required: boolean;
  /** アイテムが偏向された時に走るコールバック関数 */
  onChange: (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) => void;
  /** 選択できるアイテムたち */
  items: { id: string; name: string }[];
};

/**
 * 選択ボックスのコンポーネント
 * @param props - {label: 表示ラベル, selectedItem: 選択のアイテム, reqired: 必須か, onChange: コールバック, items: アイテム}
 * @returns コンポーネント
 */
const SelectBox = React.memo(
  ({ label, selectedItem, required, onChange, items }: SelectBoxProps) => (
    <FormControl className="mb-[16px] w-full min-w-[120px]">
      <InputLabel>{label}</InputLabel>
      <Select value={selectedItem} required={required} onChange={onChange}>
        {items.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
);

export default SelectBox;
