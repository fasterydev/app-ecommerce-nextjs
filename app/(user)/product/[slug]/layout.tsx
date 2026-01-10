import { Metadata } from "next";
import { getProduct } from "@/actions/public/products";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    try {
        const res = await getProduct(slug);

        // Verificar que la respuesta tiene la propiedad product
        if (res.statusCode === 200 && "product" in res && res.product) {
            const product = res.product;
            const productName = product.name || "Producto";
            const productDescription = product.description || `Descubre ${productName} en nuestra tienda. Productos de calidad con envío a todo el Ecuador.`;
            const productImage = product.images?.[0] || "";
            const productPrice = product.total ? `$${(product.total / 1000).toFixed(2)}` : "";

            return {
                title: `${productName}${productPrice ? ` - ${productPrice}` : ""} | Vileza Market`,
                description: productDescription,
                keywords: [
                    productName,
                    product.brand?.name || "",
                    product.category?.name || "",
                    "Vileza Market",
                    "compras en línea",
                    "Ecuador",
                ].filter(Boolean),
                openGraph: {
                    title: `${productName}${productPrice ? ` - ${productPrice}` : ""}`,
                    description: productDescription,
                    images: productImage ? [
                        {
                            url: productImage,
                            width: 1200,
                            height: 1200,
                            alt: productName,
                        }
                    ] : [],
                    type: "website",
                },
                twitter: {
                    card: "summary_large_image",
                    title: `${productName}${productPrice ? ` - ${productPrice}` : ""}`,
                    description: productDescription,
                    images: productImage ? [productImage] : [],
                },
                alternates: {
                    canonical: `/product/${slug}`,
                },
                robots: {
                    index: true,
                    follow: true,
                },
            };
        }
    } catch (error) {
        console.error("Error generating metadata:", error);
    }

    // Metadata por defecto si no se encuentra el producto
    return {
        title: "Producto no encontrado | Vileza Market",
        description: "El producto que buscas no está disponible.",
        robots: {
            index: false,
            follow: true,
        },
    };
}

export default function ProductLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
