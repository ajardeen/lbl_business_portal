import { Textarea } from "@/components/ui/textarea";

const  VA_TextArea=({
  value,
  onChange,
  placeholder = "Type your message here...",
  ...props
})=> {
  const handleChange = (e) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <Textarea
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      {...props}
    />
  );
}

export default VA_TextArea;