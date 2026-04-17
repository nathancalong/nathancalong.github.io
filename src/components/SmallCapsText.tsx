import styles from "./SmallCapsText.module.scss";

interface Props {
  children: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function SmallCapsText({
  children,
  className,
  as: Tag = "span",
}: Props) {
  const words = children.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i}>
          {i > 0 && " "}
          <span className={styles.firstLetter}>{word[0].toUpperCase()}</span>
          <span className={styles.rest}>{word.slice(1).toUpperCase()}</span>
        </span>
      ))}
    </Tag>
  );
}
