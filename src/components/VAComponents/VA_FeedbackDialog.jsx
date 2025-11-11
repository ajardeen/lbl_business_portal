"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import VA_FieldWrapper from "@/components/VAComponents/VA_FieldWrapper";
import { VA_Textarea } from "@/components/VAComponents/VA_Textarea";
import VA_Button from "@/components/VAComponents/VA_Button";
import { MessageSquare } from "lucide-react";
import { db } from "@/configs/firebase"; // ✅ import Firestore instance
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function VA_FeedbackDialog({ children }) {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!feedback.trim()) return;

    try {
      setLoading(true);

      const userData = JSON.parse(localStorage.getItem("user") || "{}");

      await addDoc(collection(db, "feedbacks"), {
        ...userData,
        feedback,
        createdAt: serverTimestamp(),
      });

      console.log("✅ Feedback saved to Firestore");

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setOpen(false);
        setFeedback("");
      }, 1500);
    } catch (err) {
      console.error("❌ Error saving feedback:", err);
    } finally {
      setLoading(false);
    }
  };

  const defaultTrigger = (
    <VA_Button
      variant="secondary"
      size="sm"
      icon={<MessageSquare className="w-4 h-4" />}
    >
      Feedback
    </VA_Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          <div
            onClick={() => setOpen(true)}
            className="cursor-pointer w-full flex items-center justify-center"
          >
            {children}
          </div>
        ) : (
          defaultTrigger
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>We value your feedback</DialogTitle>
          <DialogDescription>
            Share your thoughts or suggestions. Your feedback helps us improve.
          </DialogDescription>
        </DialogHeader>

        <VA_FieldWrapper label="Feedback" required>
          <VA_Textarea
            placeholder="Type your feedback here..."
            onChange={setFeedback}
            value={feedback}
            className="min-h-[100px]"
          />
        </VA_FieldWrapper>

        <DialogFooter className="mt-4">
          <VA_Button
            onClick={handleSubmit}
            loading={loading}
            disabled={!feedback.trim()}
            className="w-full sm:w-auto"
          >
            {submitted ? "Submitted!" : "Submit Feedback"}
          </VA_Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
