import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { CKEditorExample } from "@/Constant";
import { Card, CardBody, Col } from "reactstrap";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState } from "react";

interface EditorProps {
  placeholder: string;
  onEditorDataChange: (data: string) => void;
}

const Editor = ({ placeholder, onEditorDataChange }: EditorProps) => {
  const [editorData, setEditorData] = useState(placeholder);

  const handleEditorDataChange = (event: any, editor: any) => {
    const returndata = editor.getData();

    setEditorData(returndata);
    onEditorDataChange(returndata);
  };

  return (
    <Col sm="12">
      <Card>
        {/* <CommonCardHeader title={CKEditorExample} /> */}
        <CardBody>
          <CKEditor
            editor={ClassicEditor}
            data={editorData}
            onChange={handleEditorDataChange}
          />
        </CardBody>
      </Card>
    </Col>
  );
};

export default Editor;
