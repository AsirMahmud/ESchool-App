import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, FileText, Plus, Search, Upload } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

export default function EmployeeDocumentsPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the employee data based on the ID
  const employee = {
    id: params.id,
    name: "John Smith",
    email: "john.smith@eschool.edu",
    role: "Administrator",
    department: "Administration",
    position: "Principal",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  // Mock document data
  const documents = [
    {
      id: "1",
      name: "Employment Contract",
      type: "PDF",
      size: "1.2 MB",
      uploadedBy: "HR Manager",
      uploadedDate: "2023-05-15",
      category: "Contract",
      status: "Active",
    },
    {
      id: "2",
      name: "Resume",
      type: "PDF",
      size: "850 KB",
      uploadedBy: "John Smith",
      uploadedDate: "2023-05-10",
      category: "Personal",
      status: "Active",
    },
    {
      id: "3",
      name: "Teaching Certification",
      type: "PDF",
      size: "2.1 MB",
      uploadedBy: "HR Manager",
      uploadedDate: "2023-05-12",
      category: "Certification",
      status: "Active",
    },
    {
      id: "4",
      name: "ID Proof",
      type: "JPG",
      size: "1.5 MB",
      uploadedBy: "John Smith",
      uploadedDate: "2023-05-08",
      category: "Personal",
      status: "Active",
    },
    {
      id: "5",
      name: "Performance Review 2023",
      type: "PDF",
      size: "1.8 MB",
      uploadedBy: "Principal",
      uploadedDate: "2023-12-20",
      category: "Performance",
      status: "Active",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/admin/employees/${params.id}/profile`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Employee Documents</h1>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
              <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-medium">{employee.name}</h2>
              <p className="text-sm text-muted-foreground">{employee.email}</p>
            </div>
            <Badge
              variant="outline"
              className="ml-auto bg-purple-100 text-purple-800 border-purple-200"
            >
              {employee.role}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documents..."
            className="w-full pl-8"
          />
        </div>
        <Tabs defaultValue="all" className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">{doc.name}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      <span>Download</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>View Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>{doc.category}</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span>{doc.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size:</span>
                  <span>{doc.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Uploaded:</span>
                  <span>{doc.uploadedDate}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </CardFooter>
          </Card>
        ))}

        <Card className="border-dashed flex flex-col items-center justify-center p-6">
          <div className="rounded-full bg-primary/10 p-3 mb-3">
            <Plus className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium">Upload New Document</h3>
          <p className="  />
          </div>
          <h3 className="font-medium">Upload New Document</h3>
          <p className="text-sm text-muted-foreground text-center mt-1 mb-4">
            Click to upload a new document for this employee
          </p>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </Card>
      </div>
    </div>
  )
}
