"use client";

import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useRouter } from "next/navigation";
import { Edit2, Eye, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { updateCoverLetter } from "@/actions/cover-letter";

const CoverLetterPreview = ({ id, content }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(content);

  const {
    loading,
    fn: updateFn,
    data: updateResult,
  } = useFetch(updateCoverLetter);

  const handleSave = async () => {
    await updateFn(id, value);
  };

  useEffect(() => {
    if (updateResult && !loading) {
      toast.success("Cover letter updated successfully!");
      setIsEditing(false);
      router.refresh();
    }
  }, [updateResult, loading]);

  return (
    <div className="py-4 space-y-4">
      <div className="flex justify-end gap-2">
        {isEditing ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setValue(content);
                setIsEditing(false);
              }}
              disabled={loading}
            >
              <Eye className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </>
              )}
            </Button>
          </>
        ) : (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
      </div>

      <MDEditor
        value={value}
        onChange={setValue}
        preview={isEditing ? "live" : "preview"}
        height={700}
      />
    </div>
  );
};

export default CoverLetterPreview;
