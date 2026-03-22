
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Upload, 
  Sparkles, 
  Tag, 
  Video as VideoIcon, 
  CheckCircle2, 
  Loader2,
  Plus,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Import AI Flows
import { aiVideoTagging } from "@/ai/flows/ai-video-tagging";
import { generateVideoDescription } from "@/ai/flows/ai-video-description-generation";

export default function NewVideoPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [aiTagging, setAiTagging] = useState(false);
  const [aiDescribing, setAiDescribing] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tier: "Basic",
    tags: [] as string[],
    videoUrl: ""
  });

  const handleGenerateDescription = async () => {
    if (!formData.title) {
      toast({ title: "Title required", description: "Please enter a title before generating a description.", variant: "destructive" });
      return;
    }
    setAiDescribing(true);
    try {
      const res = await generateVideoDescription({ 
        title: formData.title, 
        keywords: formData.tags 
      });
      setFormData(prev => ({ ...prev, description: res.description }));
      toast({ title: "Description Generated", description: "AI has crafted a summary for your video." });
    } catch (e) {
      toast({ title: "Generation failed", description: "Could not generate description.", variant: "destructive" });
    } finally {
      setAiDescribing(false);
    }
  };

  const handleGenerateTags = async () => {
    if (!formData.title || !formData.description) {
      toast({ title: "Details required", description: "Enter title and description to suggest tags.", variant: "destructive" });
      return;
    }
    setAiTagging(true);
    try {
      const res = await aiVideoTagging({ 
        title: formData.title, 
        description: formData.description 
      });
      setFormData(prev => ({ 
        ...prev, 
        tags: Array.from(new Set([...prev.tags, ...res.tags]))
      }));
      toast({ title: "Tags Suggested", description: `Added ${res.tags.length} new tags based on your content.` });
    } catch (e) {
      toast({ title: "Tagging failed", description: "Could not generate tags.", variant: "destructive" });
    } finally {
      setAiTagging(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mocking Firestore upload
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Success!", description: "Video has been uploaded and secured." });
      router.push("/dashboard/videos");
    }, 1500);
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">New Video</h1>
          <p className="text-muted-foreground">Upload and configure access for your new content.</p>
        </div>
        <Button variant="ghost" onClick={() => router.back()}>Cancel</Button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <VideoIcon className="w-5 h-5 text-primary" />
                Metadata
              </CardTitle>
              <CardDescription>Enter the essential details for your video.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Video Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g. Mastering React Server Components" 
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="description">Description</Label>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleGenerateDescription}
                    disabled={aiDescribing}
                    className="text-accent hover:text-accent/80 h-auto py-0 gap-2"
                  >
                    {aiDescribing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                    AI Generate
                  </Button>
                </div>
                <Textarea 
                  id="description" 
                  placeholder="Describe what this video covers..." 
                  className="min-h-[120px]"
                  value={formData.description}
                  onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Tag className="w-5 h-5 text-accent" />
                  Discoverability
                </CardTitle>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleGenerateTags}
                  disabled={aiTagging}
                  className="gap-2 border-accent text-accent hover:bg-accent/10"
                >
                  {aiTagging ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                  Suggest Tags
                </Button>
              </div>
              <CardDescription>Tags help subscribers find your content more easily.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 min-h-[40px] p-2 rounded-md bg-secondary/30">
                {formData.tags.length === 0 && (
                  <span className="text-muted-foreground text-sm italic">No tags added yet. Use AI to suggest some.</span>
                )}
                {formData.tags.map((tag) => (
                  <Badge key={tag} className="gap-1 bg-secondary text-foreground hover:bg-secondary/80">
                    {tag}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg">Access Control</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Required Tier</Label>
                <Select value={formData.tier} onValueChange={v => setFormData(prev => ({ ...prev, tier: v }))}>
                  <SelectTrigger className="bg-secondary/30">
                    <SelectValue placeholder="Select access level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Free">Free</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-[10px] text-muted-foreground mt-2">
                  Only subscribers at or above this tier will be able to play the video.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-dashed border-2">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold">Select Video File</p>
                <p className="text-xs text-muted-foreground">MP4, MOV, or WEBM up to 2GB</p>
              </div>
              <Button type="button" variant="outline" size="sm" className="w-full">
                Choose File
              </Button>
            </CardContent>
          </Card>

          <Button 
            className="w-full h-12 bg-primary hover:bg-primary/90 text-lg font-bold gap-2" 
            disabled={loading || !formData.title}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
            Publish Content
          </Button>
        </div>
      </form>
    </div>
  );
}
