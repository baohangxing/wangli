import MarkdownPreview from "@uiw/react-markdown-preview";
import {useTheme} from "@/context/ThemeContext";

interface Props {
  content: string;
}

export default function StoryContent({content}: Props) {
  const {theme} = useTheme();

  return (
    <div className="story-md-wrap">
      <MarkdownPreview
        source={content}
        wrapperElement={{
          "data-color-mode": theme === "dark" ? "dark" : "light",
        }}
        style={{
          backgroundColor: "transparent",
          fontFamily: '"Noto Serif SC", Georgia, serif',
          fontSize: "1.125rem",
          lineHeight: "2",
          color: "inherit",
        }}
      />
    </div>
  );
}
