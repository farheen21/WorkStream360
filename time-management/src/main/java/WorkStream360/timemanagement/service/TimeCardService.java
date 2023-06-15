package WorkStream360.timemanagement.service;

import WorkStream360.timemanagement.entity.TimeCard;
import WorkStream360.timemanagement.modal.ProjectResourceData;

public interface TimeCardService{
    TimeCard saveTimeCard(ProjectResourceData projectResourceData);
}
