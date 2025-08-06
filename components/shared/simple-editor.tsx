"use client";

import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Table,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";

interface HtmlEditorProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function HtmlEditor({
  value,
  defaultValue,
  onChange,
  placeholder = "Escribe aquí...",
}: HtmlEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState(defaultValue || "");

  // Insertar contenido inicial
  useEffect(() => {
    if (editorRef.current && defaultValue) {
      editorRef.current.innerHTML = defaultValue;
    }
  }, [defaultValue]);

  // Si recibe `value` como controlado
  useEffect(() => {
    if (value !== undefined && editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const exec = (command: string, val?: string) => {
    document.execCommand(command, false, val ?? "");
    triggerChange();
  };

  const insertTable = () => {
    exec(
      "insertHTML",
      `
      <table style="width: 100%; border-collapse: collapse; border: 1px solid #1e293b;">
        <thead>
          <tr>
            <th style="border: 1px solid #1e293b; padding: 8px; font-weight: bold;">Encabezado 1</th>
            <th style="border: 1px solid #1e293b; padding: 8px; font-weight: bold;">Encabezado 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #1e293b; padding: 8px;">Celda 1</td>
            <td style="border: 1px solid #1e293b; padding: 8px;">Celda 2</td>
          </tr>
        </tbody>
      </table>
      <br/>
    `
    );
  };

  const handleFontSizeChange = (size: string) => {
    exec("fontSize", size);
  };

  const triggerChange = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setHtml(html);
      onChange?.(html);
    }
  };

  return (
    <div className="space-y-4">
      {/* Barra de herramientas */}
      <div className="flex flex-wrap gap-2 items-center border rounded-md p-2 bg-muted">
        <Button type="button" variant="outline" size="icon" onClick={() => exec("bold")}>
          <Bold className="w-4 h-4" />
        </Button>
        <Button type="button" variant="outline" size="icon" onClick={() => exec("italic")}>
          <Italic className="w-4 h-4" />
        </Button>
        <Button type="button" variant="outline" size="icon" onClick={() => exec("underline")}>
          <Underline className="w-4 h-4" />
        </Button>
        <Select onValueChange={handleFontSizeChange}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Tamaño" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">Pequeño</SelectItem>
            <SelectItem value="3">Normal</SelectItem>
            <SelectItem value="5">Grande</SelectItem>
            <SelectItem value="7">Muy grande</SelectItem>
          </SelectContent>
        </Select>
        <Button type="button" variant="outline" size="icon" onClick={() => exec("justifyLeft")}>
          <AlignLeft className="w-4 h-4" />
        </Button>
        <Button type="button" variant="outline" size="icon" onClick={() => exec("justifyCenter")}>
          <AlignCenter className="w-4 h-4" />
        </Button>
        <Button type="button" variant="outline" size="icon" onClick={() => exec("justifyRight")}>
          <AlignRight className="w-4 h-4" />
        </Button>
        <Button type="button" variant="outline" size="icon" onClick={insertTable}>
          <Table className="w-4 h-4" />
        </Button>
      </div>

      {/* Área editable */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={triggerChange}
        className="min-h-[200px] border rounded-md p-4 bg-white text-black focus:outline-none"
        style={{ cursor: "text" }}
        data-placeholder={placeholder}
      />
      {/* <pre>
        <code className="text-sm">{html}</code>
      </pre> */}
    </div>
  );
}
