import { StyleSheet, View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { api } from '../services/api';

const ModCard = ({
    item,
    isAuthenticated,
    onEdit,
    onDelete,
    onDeleteImage,
}) => (
    <Card style={styles.card} mode="contained">

        {/* IMAGEM */}
        {item.imageUrl ? (
            <Card.Cover
                style={styles.cover}
                source={{
                    uri: api.imageUrl(item.imageUrl),
                }}
                resizeMode="cover"
            />
        ) : (
            <View style={styles.coverPlaceholder}>
                <Text style={styles.placeholderIcon}>
                    +
                </Text>

                <Text style={styles.placeholderText}>
                    CONTENTHUB
                </Text>
            </View>
        )}

        {/* CONTEÚDO */}
        <Card.Content style={styles.content}>

            <Text
                style={styles.title}
                numberOfLines={2}
            >
                {item.title}
            </Text>

            <Text
                style={styles.subtitle}
                numberOfLines={1}
            >
                {item.subtitle || ' '}
            </Text>

        </Card.Content>

        {/* CONTROLES ADMINISTRATIVOS */}
        {isAuthenticated ? (
            <View style={styles.adminActions}>

                {item.imageUrl ? (
                    <IconButton
                        icon="image-remove-outline"
                        iconColor="#A1A1AA"
                        size={17}
                        style={styles.actionButton}
                        accessibilityLabel="Excluir imagem"
                        onPress={onDeleteImage}
                    />
                ) : null}

                <IconButton
                    icon="pencil-outline"
                    iconColor="#A78BFA"
                    size={17}
                    style={styles.actionButton}
                    accessibilityLabel="Editar conteúdo"
                    onPress={onEdit}
                />

                <IconButton
                    icon="delete-outline"
                    iconColor="#F87171"
                    size={17}
                    style={styles.actionButton}
                    accessibilityLabel="Excluir conteúdo"
                    onPress={onDelete}
                />

            </View>
        ) : null}

    </Card>
);

const styles = StyleSheet.create({

    /* =========================
       CARD
    ========================= */

    card: {
        width: '100%',
        overflow: 'hidden',

        backgroundColor: '#15151B',

        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#25252D',

        elevation: 0,
    },

    /* =========================
       IMAGEM
    ========================= */

    cover: {
        width: '100%',
        height: 190,

        borderRadius: 0,

        backgroundColor: '#1C1C24',
    },

    coverPlaceholder: {
        height: 190,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#181820',
    },

    placeholderIcon: {
        color: '#6D4AA8',
        fontSize: 32,
        fontWeight: '300',
        marginBottom: 5,
    },

    placeholderText: {
        color: '#52525B',
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 2,
    },

    /* =========================
       CONTEÚDO
    ========================= */

    content: {
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 13,
    },

    title: {
        color: '#FFFFFF',

        fontSize: 15,
        fontWeight: '700',

        height: 40,
        lineHeight: 20,
    },

    subtitle: {
        color: '#A78BFA',

        fontSize: 11,
        fontWeight: '500',

        height: 18,
        lineHeight: 14,
    },

    /* =========================
       AÇÕES
    ========================= */

    adminActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',

        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#25252D',

        paddingHorizontal: 5,
        paddingVertical: 2,
    },

    actionButton: {
        margin: 0,
    },

});

export default ModCard;