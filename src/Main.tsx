import React, { useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch } from "antd";
import { Radio, RadioChangeEvent, Checkbox, Button } from "antd";
import { defaultData } from "./data/data";
import clsx from "clsx";

const toolOptions = [
  { label: "Redux", value: "0" },
  { label: "Lodash", value: "1" },
  { label: "Ant Design", value: "2" },
  { label: "Webpack", value: "3" },
  { label: "Other", value: "4" },
];

type InputProps = {
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  disabled: boolean;
  className: string;
};

function Input(props: InputProps) {
  const { placeholder, value, onChange, disabled, className } = props;
  const [placeholderStage, setPlaceholderStage] = useState<
    "default" | "elevated"
  >("default");
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div
      className={clsx(
        "rounded-[8px] p-[2px] relative border-[1px] border-solid border-[#D8D8D8] hover:border-[#6b47ed]",
        isFocused && "border-[#6b47ed]",
        disabled && "hover:border-[#D8D8D8] select-none",
        className
      )}
      onClick={() => {
        ref.current?.focus();
        setIsFocused(true);
      }}
    >
      <input
        type="text"
        className={clsx(
          "relative w-[98%] outline-none text-[14px] pl-[9px] ml-[2px] disabled:bg-white",
          placeholderStage === "default" ? "" : "pt-[21px]",
          disabled && "text-[#F5F5F5]"
        )}
        onFocus={() => setPlaceholderStage("elevated")}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div
        className={clsx(
          "absolute top-[12px] left-[12px] text-[#979797] transition-all",
          placeholderStage === "elevated" && "top-[2px] text-[14px]",
          disabled && "text-[#F5F5F5]"
        )}
      >
        {placeholder}
      </div>
    </div>
  );
}

function Main() {
  const [editable, setEditable] = useState(true);
  const [form, setForm] = useState(defaultData);

  return (
    <div className="bg-white p-[32px] w-[380px] rounded-[20px] flex flex-col">
      <div className="flex justify-between mb-[20px]">
        <div>Editable</div>
        <Switch defaultChecked onChange={setEditable}></Switch>
      </div>
      <Input
        placeholder="First Name"
        value={form.firstName}
        onChange={(val) => setForm((form) => ({ ...form, firstName: val }))}
        className="mb-[20px] h-[46px]"
        disabled={!editable}
      />
      <div className="font-bold mb-[15px] text-[18px]">
        Are you proficient in ReactJS development?
      </div>
      <Radio.Group
        onChange={(e) =>
          setForm((form) => ({ ...form, isProficient: e.target.value }))
        }
        value={form.isProficient}
        className="flex flex-col gap-y-[16px] mb-[20px]"
        disabled={!editable}
      >
        <Radio value={false}>No</Radio>
        <Radio value={true}>Yes</Radio>
      </Radio.Group>
      <div className="font-bold text-[18px]">Which tools do you use?</div>
      <div className="text-[#616161] mb-[16px]">
        Please select all that apply.
      </div>
      <Checkbox.Group
        defaultValue={form.toolsUsed.split(",")}
        onChange={(vals) => {
          setForm((form) => ({ ...form, toolsUsed: vals.sort().join(",") }));
        }}
        className="flex flex-col gap-y-[15px] mb-[40px]"
        disabled={!editable}
      >
        {toolOptions.map((option, idx) => (
          <Checkbox value={option.value} className="text-nowrap checkbox">
            {option.label}
          </Checkbox>
        ))}
      </Checkbox.Group>
      <Button
        type="primary"
        className="h-[57px] w-[200px] rounded-[80px] bg-[#6b47ed] font-semibold self-center"
        disabled={!editable}
        onClick={() => console.log(form)}
      >
        Process
      </Button>
    </div>
  );
}

export default Main;
