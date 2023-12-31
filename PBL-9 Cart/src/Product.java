import java.util.Objects;

public class Product {

    private static int firstkey=1;
    private final int key;
    private String name;
    private int price;

    public Product(String name, int price) {
        key=firstkey++;
//        key=key++;
//        key++;
//        this.key = key;
        this.name = name;
        this.price = price;
    }

    public int getKey() {
        return key;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product p = (Product) o;
        return Objects.equals(name, p.name) ;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }


}
