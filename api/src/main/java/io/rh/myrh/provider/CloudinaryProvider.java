package io.rh.myrh.provider;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Configuration
public class CloudinaryProvider {

    public String uploadImage(MultipartFile image)  {
        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "bankconnect",
                "api_key", "146139492622934",
                "api_secret", "nF94rFrBb-bJV35__ju_YXC_6AQ"));

        Map uploadResult ;
        try {
            uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
            return uploadResult.get("url").toString();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
