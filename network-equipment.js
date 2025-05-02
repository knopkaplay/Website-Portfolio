// Код для работы с 3D-моделями сетевого оборудования

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация фильтров
    initFilters();
    
    // Инициализация 3D-моделей
    initRouterModel();
    initSwitchModel();
    initTLWR1043NDModel();
    
    // Инициализация кнопок управления
    initControlButtons();
    
    // Инициализация для TP-Link модели
    initTPLinkModel();
});

// Функция для инициализации фильтров
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const equipmentItems = document.querySelectorAll('.equipment-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс со всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс на нажатую кнопку
            this.classList.add('active');
            
            // Получаем значение фильтра
            const filter = this.getAttribute('data-filter');
            
            // Фильтруем элементы
            equipmentItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'grid';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Функция для инициализации модели маршрутизатора с использованием ColladaLoader
function initRouterModel() {
    const container = document.getElementById('router-model-1');
    if (!container) return;
    
    // Создаем сцену
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
    
    // Создаем камеру
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Создаем рендерер
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Добавляем освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Используем ColladaLoader для загрузки модели
    const loader = new THREE.ColladaLoader();
    loader.load('3D models/Cisco 2900 Series/model.dae', function(collada) {
        const model = collada.scene;
        model.scale.set(0.1, 0.1, 0.1); // Масштабируем модель, если необходимо
        scene.add(model);
    }, undefined, function(error) {
        console.error('Ошибка загрузки модели:', error);
    });
    
    // Создаем контроллер для вращения
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    
    // Функция анимации
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    
    // Запускаем анимацию
    animate();
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Функция для добавления деталей к маршрутизатору
function addRouterDetails(router) {
    // Добавляем порты
    const portGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.1);
    const portMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    
    // Создаем 4 порта
    for (let i = 0; i < 4; i++) {
        const port = new THREE.Mesh(portGeometry, portMaterial);
        port.position.set(-1.2 + i * 0.8, 0, 1.05);
        router.add(port);
    }
    
    // Добавляем индикаторы
    const ledGeometry = new THREE.CircleGeometry(0.05, 16);
    const ledMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    
    for (let i = 0; i < 4; i++) {
        const led = new THREE.Mesh(ledGeometry, ledMaterial);
        led.position.set(-1.2 + i * 0.8, 0.2, 1.05);
        led.rotation.x = -Math.PI / 2;
        router.add(led);
    }
    
    // Добавляем логотип
    const logoGeometry = new THREE.PlaneGeometry(1, 0.3);
    const logoMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
    });
    
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 0.26, 0);
    logo.rotation.x = -Math.PI / 2;
    router.add(logo);
}

// Функция для инициализации модели коммутатора Cisco WS-C2960R+48PST-L
function initSwitchModel() {
    const container = document.getElementById('switch-model-1');
    if (!container) return;
    
    // Создаем сцену
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
    
    // Создаем камеру
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Создаем рендерер
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Добавляем освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Используем ColladaLoader для загрузки модели
    const loader = new THREE.ColladaLoader();
    loader.load('3D models/Cisco WS-C2960R+48PST-L/model.dae', function(collada) {
        const model = collada.scene;
        model.scale.set(0.1, 0.1, 0.1); // Масштабируем модель, если необходимо
        scene.add(model);
    }, undefined, function(error) {
        console.error('Ошибка загрузки модели:', error);
    });
    
    // Создаем контроллер для вращения
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    
    // Функция анимации
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    
    // Запускаем анимацию
    animate();
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    // Сохраняем объекты в контейнере для доступа из других функций
    container.sceneData = {
        scene: scene,
        camera: camera,
        renderer: renderer,
        controls: controls,
        model: model
    };
}

// Функция для добавления деталей к коммутатору
function addSwitchDetails(switchModel) {
    // Добавляем порты
    const portGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.1);
    const portMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
    
    // Создаем 24 порта (в два ряда)
    for (let row = 0; row < 2; row++) {
        for (let i = 0; i < 12; i++) {
            const port = new THREE.Mesh(portGeometry, portMaterial);
            port.position.set(-1.8 + i * 0.3, -0.1 + row * 0.2, 0.8);
            switchModel.add(port);
        }
    }
    
    // Добавляем индикаторы
    const ledGeometry = new THREE.CircleGeometry(0.03, 16);
    const ledMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const ledMaterialAmber = new THREE.MeshBasicMaterial({ color: 0xffbf00 });
    
    for (let i = 0; i < 6; i++) {
        const led = new THREE.Mesh(ledGeometry, i % 2 === 0 ? ledMaterial : ledMaterialAmber);
        led.position.set(-1.8 + i * 0.6, 0.2, 0.8);
        led.rotation.x = -Math.PI / 2;
        switchModel.add(led);
    }
    
    // Добавляем логотип
    const logoGeometry = new THREE.PlaneGeometry(1, 0.3);
    const logoMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
    });
    
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 0.26, 0);
    logo.rotation.x = -Math.PI / 2;
    switchModel.add(logo);
}

// Функция для инициализации модели роутера TL-WR1043ND с использованием ColladaLoader
function initTLWR1043NDModel() {
    const tplinkCanvas = document.querySelector('.equipment-item[data-category="access-points"] canvas');
    if (!tplinkCanvas) return;

    // Находим кнопки управления
    const container = tplinkCanvas.closest('.equipment-item');
    const rotateBtn = container.querySelector('.rotate-btn');
    const zoomInBtn = container.querySelector('.zoom-in-btn');
    const zoomOutBtn = container.querySelector('.zoom-out-btn');

    const renderer = new THREE.WebGLRenderer({ canvas: tplinkCanvas, antialias: true });
    renderer.setSize(tplinkCanvas.width, tplinkCanvas.height);
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    
    const camera = new THREE.PerspectiveCamera(45, tplinkCanvas.width / tplinkCanvas.height, 0.1, 1000);
    camera.position.set(0, 2, 10);

    const controls = new THREE.OrbitControls(camera, tplinkCanvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 5;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI / 1.5;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 2.0; // Скорость автоматического вращения

    // Обработчики кнопок
    rotateBtn.addEventListener('click', () => {
        controls.autoRotate = !controls.autoRotate;
        rotateBtn.classList.toggle('active');
    });

    zoomInBtn.addEventListener('click', () => {
        const currentDistance = camera.position.distanceTo(controls.target);
        if (currentDistance > controls.minDistance) {
            camera.position.lerp(controls.target, 0.2); // Плавное приближение
        }
    });

    zoomOutBtn.addEventListener('click', () => {
        const currentDistance = camera.position.distanceTo(controls.target);
        if (currentDistance < controls.maxDistance) {
            const direction = camera.position.clone().sub(controls.target).normalize();
            camera.position.add(direction.multiplyScalar(1)); // Плавное отдаление
        }
    });

    // Добавляем двойной клик для сброса позиции
    tplinkCanvas.addEventListener('dblclick', () => {
        camera.position.set(0, 2, 10);
        controls.target.set(0, 0, 0);
        controls.update();
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const loader = new THREE.ColladaLoader();
    loader.load(
        './3D models/TL-WR1043ND/router.dae',
        function (collada) {
            const model = collada.scene;
            
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
            
            const scale = 1.5;
            model.scale.set(scale, scale, scale);
            
            scene.add(model);

            function animate() {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            }
            animate();
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% загружено');
        },
        function (error) {
            console.error('Ошибка загрузки модели:', error);
        }
    );

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        camera.aspect = tplinkCanvas.width / tplinkCanvas.height;
        camera.updateProjectionMatrix();
        renderer.setSize(tplinkCanvas.width, tplinkCanvas.height);
    }
}

// Функция для инициализации кнопок управления
function initControlButtons() {
    // Кнопки вращения
    const rotateButtons = document.querySelectorAll('.rotate-btn');
    rotateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const container = this.closest('.equipment-preview').querySelector('.model-container');
            if (container && container.sceneData) {
                const model = container.sceneData.model;
                // Запускаем автоматическое вращение
                const rotationAnimation = setInterval(() => {
                    model.rotation.y += 0.05;
                }, 30);
                
                // Останавливаем вращение через 3 секунды
                setTimeout(() => {
                    clearInterval(rotationAnimation);
                }, 3000);
            }
        });
    });
    
    // Кнопки увеличения
    const zoomInButtons = document.querySelectorAll('.zoom-in-btn');
    zoomInButtons.forEach(button => {
        button.addEventListener('click', function() {
            const container = this.closest('.equipment-preview').querySelector('.model-container');
            if (container && container.sceneData) {
                const camera = container.sceneData.camera;
                if (camera.position.z > 2) {
                    camera.position.z -= 1;
                }
            }
        });
    });
    
    // Кнопки уменьшения
    const zoomOutButtons = document.querySelectorAll('.zoom-out-btn');
    zoomOutButtons.forEach(button => {
        button.addEventListener('click', function() {
            const container = this.closest('.equipment-preview').querySelector('.model-container');
            if (container && container.sceneData) {
                const camera = container.sceneData.camera;
                if (camera.position.z < 10) {
                    camera.position.z += 1;
                }
            }
        });
    });
}

// Получаем элементы модального окна
const modal = document.getElementById('modelModal');
const openModelBtn = document.getElementById('openModelBtn');
const closeBtn = document.querySelector('.close-btn');

// Открытие модального окна
openModelBtn.addEventListener('click', function() {
    modal.style.display = 'block';
});

// Закрытие модального окна
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Инициализация для TP-Link модели
function initTPLinkModel() {
    const tplinkCanvas = document.querySelector('.equipment-item[data-category="access-points"] canvas');
    if (!tplinkCanvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas: tplinkCanvas, antialias: true });
    renderer.setSize(tplinkCanvas.width, tplinkCanvas.height);
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    
    const camera = new THREE.PerspectiveCamera(45, tplinkCanvas.width / tplinkCanvas.height, 0.1, 1000);
    camera.position.set(0, 2, 10);

    // Добавляем OrbitControls
    const controls = new THREE.OrbitControls(camera, tplinkCanvas);
    controls.enableDamping = true; // Плавное вращение
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 3; // Минимальное приближение
    controls.maxDistance = 10; // Максимальное отдаление
    controls.maxPolarAngle = Math.PI / 1.5; // Ограничение вращения по вертикали
    controls.autoRotate = false; // Автоматическое вращение выключено

    // Добавим освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const loader = new THREE.ColladaLoader();
    loader.load(
        './3D models/TL-WR1043ND/router.dae',
        function (collada) {
            const model = collada.scene;
            
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
            
            const scale = 1.5;
            model.scale.set(scale, scale, scale);
            
            scene.add(model);

            // Обновляем анимацию для работы с OrbitControls
            function animate() {
                requestAnimationFrame(animate);
                controls.update(); // Обновляем controls
                renderer.render(scene, camera);
            }
            animate();
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% загружено');
        },
        function (error) {
            console.error('Ошибка загрузки модели:', error);
        }
    );

    // Добавляем обработчик изменения размера окна
    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        camera.aspect = tplinkCanvas.width / tplinkCanvas.height;
        camera.updateProjectionMatrix();
        renderer.setSize(tplinkCanvas.width, tplinkCanvas.height);
    }
}

// Запускаем после загрузки DOM
document.addEventListener('DOMContentLoaded', initTPLinkModel); 