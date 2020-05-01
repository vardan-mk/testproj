package am.iravaban.gatewayapp;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("am.iravaban.gatewayapp");

        noClasses()
            .that()
                .resideInAnyPackage("am.iravaban.gatewayapp.service..")
            .or()
                .resideInAnyPackage("am.iravaban.gatewayapp.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..am.iravaban.gatewayapp.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
