import { useTheme } from "@mui/material";

interface Props {
  size: number;
}

export default function PrimaryLine({ size }: Props) {
  const theme = useTheme();
  return (
    <hr
      style={{
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        height: size,
        width: "100%",
      }}
    />
  );
}
