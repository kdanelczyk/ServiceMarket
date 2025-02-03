package servicemarket.servicemarket.converter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class ImagesConverterImpl implements ImagesConverter {

    @Override
    public List<Binary> imagesConverter(List<MultipartFile> images) {
        List<Binary> binaryImages = new ArrayList<>();
        if (images != null && !images.isEmpty()) {
            binaryImages = images.stream()
                    .map(file -> {
                        try {
                            return new Binary(BsonBinarySubType.BINARY, file.getBytes());
                        } catch (IOException e) {
                            throw new RuntimeException("Error converting file to binary", e);
                        }
                    })
                    .collect(Collectors.toList());
        }
        return binaryImages;
    }

}
