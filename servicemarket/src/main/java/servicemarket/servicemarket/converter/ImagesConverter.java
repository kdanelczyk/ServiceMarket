package servicemarket.servicemarket.converter;

import java.util.List;

import org.bson.types.Binary;
import org.springframework.web.multipart.MultipartFile;

public interface ImagesConverter {

    public List<Binary> imagesConverter(List<MultipartFile> images);

}
