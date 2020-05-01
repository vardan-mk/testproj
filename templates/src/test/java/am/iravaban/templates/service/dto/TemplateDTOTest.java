package am.iravaban.templates.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import am.iravaban.templates.web.rest.TestUtil;

public class TemplateDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TemplateDTO.class);
        TemplateDTO templateDTO1 = new TemplateDTO();
        templateDTO1.setId(1L);
        TemplateDTO templateDTO2 = new TemplateDTO();
        assertThat(templateDTO1).isNotEqualTo(templateDTO2);
        templateDTO2.setId(templateDTO1.getId());
        assertThat(templateDTO1).isEqualTo(templateDTO2);
        templateDTO2.setId(2L);
        assertThat(templateDTO1).isNotEqualTo(templateDTO2);
        templateDTO1.setId(null);
        assertThat(templateDTO1).isNotEqualTo(templateDTO2);
    }
}
