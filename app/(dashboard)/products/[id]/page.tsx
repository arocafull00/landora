import { ProductEditorPage } from "@/components/products/product-editor-page";
export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) { return <ProductEditorPage productId={(await params).id} />; }
