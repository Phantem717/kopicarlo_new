"use client";
import React, { useState, useRef } from "react";
import { Modal, Button } from "antd";
import Draggable from "react-draggable";

const DraggableModal = () => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const draggleRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Draggable Modal
      </Button>
      <Modal
        title={
          <div
            style={{ width: "100%", cursor: "move" }}
            onMouseOver={() => setDisabled(false)}
            onMouseOut={() => setDisabled(true)}
          >
            Draggable Modal
          </div>
        }
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            handle=".ant-modal-title"
            nodeRef={draggleRef} // penting agar tidak pakai findDOMNode
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <p>Ini konten modal yang bisa di-drag</p>
      </Modal>
    </>
  );
};

export default DraggableModal;
