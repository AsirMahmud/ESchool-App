"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Building2,
} from "lucide-react";
import { useClasses, useCreateClass, useUpdateClass, useDeleteClass } from "@/hooks/use-classes";

export default function AdminClassroomsPage() {
  const [isAddClassroomOpen, setIsAddClassroomOpen] = useState(false);
  const [isEditClassroomOpen, setIsEditClassroomOpen] = useState(false);
  const [editingClassroom, setEditingClassroom] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("all");

  const { data: classrooms, isLoading, error } = useClasses();
  
  const createClassroomMutation = useCreateClass();
  const updateClassroomMutation = useUpdateClass();
  const deleteClassroomMutation = useDeleteClass();

  const [classroomForm, setClassroomForm] = useState({
    floor: 1,
    room_no: "",
    room_name: "",
    room_type: "classroom",
    capacity: 30,
    description: "",
    equipment: "",
    is_available: true,
    is_air_conditioned: false,
    has_projector: false,
    has_whiteboard: true,
    has_computers: false,
  });

  const handleCreateClassroom = async () => {
    try {
      await createClassroomMutation.mutateAsync(classroomForm as any);
      setIsAddClassroomOpen(false);
      setClassroomForm({
        floor: 1,
        room_no: "",
        room_name: "",
        room_type: "classroom",
        capacity: 30,
        description: "",
        equipment: "",
        is_available: true,
        is_air_conditioned: false,
        has_projector: false,
        has_whiteboard: true,
        has_computers: false,
      });
    } catch (error) {
      console.error('Failed to create classroom:', error);
    }
  };

  const handleEditClassroom = (classroom: any) => {
    setEditingClassroom(classroom);
    setClassroomForm({
      floor: classroom.floor || 1,
      room_no: classroom.room_no || "",
      room_name: classroom.room_name || "",
      room_type: classroom.room_type || "classroom",
      capacity: classroom.capacity || 30,
      description: classroom.description || "",
      equipment: classroom.equipment || "",
      is_available: classroom.is_available !== undefined ? classroom.is_available : true,
      is_air_conditioned: classroom.is_air_conditioned || false,
      has_projector: classroom.has_projector || false,
      has_whiteboard: classroom.has_whiteboard !== undefined ? classroom.has_whiteboard : true,
      has_computers: classroom.has_computers || false,
    });
    setIsEditClassroomOpen(true);
  };

  const handleUpdateClassroom = async () => {
    if (!editingClassroom) return;
    
    try {
      await updateClassroomMutation.mutateAsync({
        id: editingClassroom.id,
        ...classroomForm
      } as any);
      setIsEditClassroomOpen(false);
      setEditingClassroom(null);
    } catch (error) {
      console.error('Failed to update classroom:', error);
    }
  };

  const handleDeleteClassroom = (id: number) => {
    if (confirm('Are you sure you want to delete this classroom?')) {
      deleteClassroomMutation.mutate(id);
    }
  };

  // Filter classrooms based on search and room type
  const filteredClassrooms = classrooms?.filter((classroom: any) => {
    const matchesSearch = classroom.room_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classroom.room_no?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRoomType = selectedRoomType === "all" || classroom.room_type === selectedRoomType;
    return matchesSearch && matchesRoomType;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading classrooms...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error loading classrooms: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Classroom Management
          </h2>
          <p className="text-muted-foreground">
            Manage classrooms, levels, and sections.
          </p>
        </div>
        <Dialog open={isAddClassroomOpen} onOpenChange={setIsAddClassroomOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Classroom
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Classroom</DialogTitle>
              <DialogDescription>
                Create a new classroom/room with physical location and facilities information.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="floor">Floor</Label>
                  <Input
                    id="floor"
                    type="number"
                    min="0"
                    max="10"
                    value={classroomForm.floor}
                    onChange={(e) => setClassroomForm({ ...classroomForm, floor: parseInt(e.target.value) || 1 })}
                    placeholder="1"
                  />
                </div>
                <div>
                  <Label htmlFor="room_no">Room Number</Label>
                  <Input
                    id="room_no"
                    value={classroomForm.room_no}
                    onChange={(e) => setClassroomForm({ ...classroomForm, room_no: e.target.value })}
                    placeholder="e.g., 101, A-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="room_name">Room Name</Label>
                  <Input
                    id="room_name"
                    value={classroomForm.room_name}
                    onChange={(e) => setClassroomForm({ ...classroomForm, room_name: e.target.value })}
                    placeholder="e.g., Computer Lab 1"
                  />
                </div>
                <div>
                  <Label htmlFor="room_type">Room Type</Label>
                  <Select value={classroomForm.room_type} onValueChange={(value) => setClassroomForm({ ...classroomForm, room_type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="classroom">Classroom</SelectItem>
                      <SelectItem value="laboratory">Laboratory</SelectItem>
                      <SelectItem value="library">Library</SelectItem>
                      <SelectItem value="computer_lab">Computer Laboratory</SelectItem>
                      <SelectItem value="science_lab">Science Laboratory</SelectItem>
                      <SelectItem value="art_room">Art Room</SelectItem>
                      <SelectItem value="music_room">Music Room</SelectItem>
                      <SelectItem value="gymnasium">Gymnasium</SelectItem>
                      <SelectItem value="auditorium">Auditorium</SelectItem>
                      <SelectItem value="conference_room">Conference Room</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="storage">Storage Room</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  min="1"
                  max="500"
                  value={classroomForm.capacity}
                  onChange={(e) => setClassroomForm({ ...classroomForm, capacity: parseInt(e.target.value) || 30 })}
                  placeholder="30"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={classroomForm.description}
                  onChange={(e) => setClassroomForm({ ...classroomForm, description: e.target.value })}
                  placeholder="Description of the room and its facilities"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="equipment">Equipment</Label>
                <Textarea
                  id="equipment"
                  value={classroomForm.equipment}
                  onChange={(e) => setClassroomForm({ ...classroomForm, equipment: e.target.value })}
                  placeholder="Available equipment in the room"
                  rows={2}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddClassroomOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreateClassroom} 
                disabled={createClassroomMutation.isPending}
              >
                {createClassroomMutation.isPending ? "Creating..." : "Create Classroom"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>All Classrooms</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search classrooms..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="classroom">Classroom</SelectItem>
                  <SelectItem value="laboratory">Laboratory</SelectItem>
                  <SelectItem value="library">Library</SelectItem>
                  <SelectItem value="computer_lab">Computer Lab</SelectItem>
                  <SelectItem value="science_lab">Science Lab</SelectItem>
                  <SelectItem value="art_room">Art Room</SelectItem>
                  <SelectItem value="music_room">Music Room</SelectItem>
                  <SelectItem value="gymnasium">Gymnasium</SelectItem>
                  <SelectItem value="auditorium">Auditorium</SelectItem>
                  <SelectItem value="conference_room">Conference Room</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="storage">Storage</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room</TableHead>
                <TableHead>Floor</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Features</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClassrooms?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No classrooms found.
                  </TableCell>
                </TableRow>
              ) : (
                Array.isArray(filteredClassrooms) && filteredClassrooms.map((classroom: any) => (
                  <TableRow key={classroom.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{classroom.room_name || `Room ${classroom.room_no}`}</div>
                        <div className="text-sm text-muted-foreground">{classroom.room_no}</div>
                      </div>
                    </TableCell>
                    <TableCell>{classroom.floor}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {classroom.room_type?.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                      </Badge>
                    </TableCell>
                    <TableCell>{classroom.capacity}</TableCell>
                    <TableCell>
                      <Badge variant={classroom.is_available ? "default" : "destructive"}>
                        {classroom.is_available ? "Available" : "Unavailable"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {classroom.has_projector && <Badge variant="secondary" className="text-xs">Projector</Badge>}
                        {classroom.has_computers && <Badge variant="secondary" className="text-xs">Computers</Badge>}
                        {classroom.is_air_conditioned && <Badge variant="secondary" className="text-xs">AC</Badge>}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditClassroom(classroom)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteClassroom(classroom.id)}
                        disabled={deleteClassroomMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Classroom Dialog */}
      <Dialog open={isEditClassroomOpen} onOpenChange={setIsEditClassroomOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Classroom</DialogTitle>
            <DialogDescription>
              Update classroom information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-floor">Floor</Label>
                <Input
                  id="edit-floor"
                  type="number"
                  min="0"
                  max="10"
                  value={classroomForm.floor}
                  onChange={(e) => setClassroomForm({ ...classroomForm, floor: parseInt(e.target.value) || 1 })}
                  placeholder="1"
                />
              </div>
              <div>
                <Label htmlFor="edit-room_no">Room Number</Label>
                <Input
                  id="edit-room_no"
                  value={classroomForm.room_no}
                  onChange={(e) => setClassroomForm({ ...classroomForm, room_no: e.target.value })}
                  placeholder="e.g., 101, A-12"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-room_name">Room Name</Label>
                <Input
                  id="edit-room_name"
                  value={classroomForm.room_name}
                  onChange={(e) => setClassroomForm({ ...classroomForm, room_name: e.target.value })}
                  placeholder="e.g., Computer Lab 1"
                />
              </div>
              <div>
                <Label htmlFor="edit-room_type">Room Type</Label>
                <Select value={classroomForm.room_type} onValueChange={(value) => setClassroomForm({ ...classroomForm, room_type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classroom">Classroom</SelectItem>
                    <SelectItem value="laboratory">Laboratory</SelectItem>
                    <SelectItem value="library">Library</SelectItem>
                    <SelectItem value="computer_lab">Computer Laboratory</SelectItem>
                    <SelectItem value="science_lab">Science Laboratory</SelectItem>
                    <SelectItem value="art_room">Art Room</SelectItem>
                    <SelectItem value="music_room">Music Room</SelectItem>
                    <SelectItem value="gymnasium">Gymnasium</SelectItem>
                    <SelectItem value="auditorium">Auditorium</SelectItem>
                    <SelectItem value="conference_room">Conference Room</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="storage">Storage Room</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="edit-capacity">Capacity</Label>
              <Input
                id="edit-capacity"
                type="number"
                min="1"
                max="500"
                value={classroomForm.capacity}
                onChange={(e) => setClassroomForm({ ...classroomForm, capacity: parseInt(e.target.value) || 30 })}
                placeholder="30"
              />
            </div>

            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={classroomForm.description}
                onChange={(e) => setClassroomForm({ ...classroomForm, description: e.target.value })}
                placeholder="Description of the room and its facilities"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="edit-equipment">Equipment</Label>
              <Textarea
                id="edit-equipment"
                value={classroomForm.equipment}
                onChange={(e) => setClassroomForm({ ...classroomForm, equipment: e.target.value })}
                placeholder="Available equipment in the room"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditClassroomOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateClassroom}
              disabled={updateClassroomMutation.isPending}
            >
              {updateClassroomMutation.isPending ? "Updating..." : "Update Classroom"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
